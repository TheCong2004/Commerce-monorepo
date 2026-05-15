import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { setup } from './routes/setup';
import { catalog } from './routes/catalog';
import { inventory } from './routes/inventory';
import { checkout } from './routes/checkout';
import { orders } from './routes/orders';
import { customers } from './routes/customers';
import { webhooks } from './routes/webhooks';
import { webhooksRoutes } from './routes/webhooks-outbound';
import { images } from './routes/images';
import { discounts } from './routes/discounts';
import { oauth } from './routes/oauth';
import { ucp } from './routes/ucp';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { ApiError, type Env, type DOStub } from './types';

type Variables = {
  db: DOStub;
};

const app = new OpenAPIHono<{ Bindings: Env; Variables: Variables }>();

app.use('*', cors());

app.use('*', async (c: any, next: any) => {
  const id = c.env.MERCHANT.idFromName('default');
  const stub = c.env.MERCHANT.get(id);
  c.set('db', stub as unknown as DOStub);
  await next();
});

app.use('/v1/*', rateLimitMiddleware());

app.onError((err: Error, c: any) => {
  console.error(err);

  if (err instanceof ApiError) {
    return c.json(
      {
        error: {
          code: err.code,
          message: err.message,
          ...(err.details && { details: err.details }),
        },
      },
      err.statusCode as any
    );
  }

  return c.json({ error: { code: 'internal', message: 'Internal server error' } }, 500);
});

app.get('/', (c) => c.json({ name: 'merchant', version: '0.1.0', ok: true }));

app.route('/v1/setup', setup);
app.route('/v1/products', catalog);
app.route('/v1/inventory', inventory);
app.route('/v1/carts', checkout);
app.route('/v1/orders', orders);
app.route('/v1/customers', customers);
app.route('/v1/webhooks', webhooks);
app.route('/v1/webhooks', webhooksRoutes);
app.route('/v1/images', images);
app.route('/v1/discounts', discounts);
app.route('/oauth', oauth);
app.route('', oauth);
app.route('', ucp);

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Merchant API',
    version: '1.0.0',
    description: 'The open-source commerce backend for Cloudflare + Stripe',
  },
  servers: [{ url: '/' }],
});

app.get('/docs', swaggerUI({ url: '/openapi.json' }));

export default app;

export type AppType = typeof app;
