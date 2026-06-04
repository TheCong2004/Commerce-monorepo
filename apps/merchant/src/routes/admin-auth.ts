import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { ApiError, type HonoEnv } from '../types';
import { authMiddleware, adminOnly } from '../middleware/auth';
import {
  AdminLoginBody,
  AdminResponse,
  AdminLoginResponse,
  OkResponse,
  ErrorResponse,
} from '../schemas';

export const adminAuth = new OpenAPIHono<HonoEnv>();

// 1. POST /login - Admin login (Proxy to Supabase Auth)
const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  tags: ['Admin Auth'],
  summary: 'Admin login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AdminLoginBody,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AdminLoginResponse,
        },
      },
      description: 'Login successful',
    },
    401: {
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
      description: 'Invalid email or password',
    },
  },
});

adminAuth.openapi(loginRoute, async (c) => {
  const { email, password } = c.req.valid('json');
  const supabaseUrl = c.env.SUPABASE_URL;
  const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new ApiError('supabase_config_missing', 500, 'Supabase configurations are missing on the backend');
  }

  let res;
  try {
    // Call Supabase Auth API
    res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (fetchErr: any) {
    console.error('Supabase fetch failed:', fetchErr);
    throw ApiError.unauthorized('Không thể kết nối đến máy chủ xác thực Supabase. Vui lòng kiểm tra lại cấu hình SUPABASE_URL.');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({})) as any;
    throw ApiError.unauthorized(errorData?.error_description || errorData?.error || 'Email hoặc mật khẩu không chính xác.');
  }

  const data = await res.json() as any;
  const expiresAt = new Date(Date.now() + (data.expires_in || 3600) * 1000).toISOString();

  return c.json({
    token: data.access_token,
    admin: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email.split('@')[0],
      role: 'admin' as const,
      avatar_url: data.user.user_metadata?.avatar_url || null,
      is_active: true,
      last_login_at: new Date().toISOString(),
      created_at: data.user.created_at || new Date().toISOString(),
    },
    expires_at: expiresAt,
  }, 200);
});

// 2. GET /me - Get current admin profile
const meRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Admin Auth'],
  summary: 'Get current admin details',
  security: [{ bearerAuth: [] }],
  middleware: [authMiddleware, adminOnly] as const,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AdminResponse,
        },
      },
      description: 'Admin details retrieved',
    },
    401: {
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
      description: 'Unauthorized',
    },
  },
});

adminAuth.openapi(meRoute, async (c) => {
  const auth = c.get('auth');
  const supabaseUrl = c.env.SUPABASE_URL;
  const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;

  if (!auth.adminUserId || !auth.adminEmail) {
    throw ApiError.unauthorized('Not authenticated as admin user');
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new ApiError('supabase_config_missing', 500, 'Supabase configurations are missing on the backend');
  }

  const authHeader = c.req.header('Authorization');
  const token = authHeader?.slice(7);

  let res;
  try {
    res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (fetchErr: any) {
    console.error('Supabase user profile fetch failed:', fetchErr);
    throw ApiError.unauthorized('Không thể kết nối đến máy chủ Supabase để lấy thông tin profile.');
  }

  if (!res.ok) {
    throw ApiError.unauthorized('Failed to retrieve profile from identity provider');
  }

  const user = await res.json() as any;

  return c.json({
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
    role: 'admin' as const,
    avatar_url: user.user_metadata?.avatar_url || null,
    is_active: true,
    last_login_at: new Date().toISOString(),
    created_at: user.created_at || new Date().toISOString(),
  }, 200);
});

// 3. POST /logout - Invalidate session on Supabase
const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Admin Auth'],
  summary: 'Admin logout',
  security: [{ bearerAuth: [] }],
  middleware: [authMiddleware, adminOnly] as const,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: OkResponse,
        },
      },
      description: 'Logout successful',
    },
  },
});

adminAuth.openapi(logoutRoute, async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL;
  const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new ApiError('supabase_config_missing', 500, 'Supabase configurations are missing on the backend');
  }

  const authHeader = c.req.header('Authorization');
  const token = authHeader?.slice(7);

  if (token) {
    try {
      await fetch(`${supabaseUrl}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (logoutErr: any) {
      console.warn('Supabase logout call failed:', logoutErr);
    }
  }

  return c.json({ ok: true as const }, 200);
});
