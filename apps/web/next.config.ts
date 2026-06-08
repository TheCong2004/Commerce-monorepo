import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'editor.pascal.app',
      },
      {
        protocol: 'https',
        hostname: 'pannellum.org',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
        { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'http', hostname: '127.0.0.1', port: '9000', pathname: '/static/**' },
      { protocol: 'http', hostname: 'localhost', port: '9000', pathname: '/**' },
      { protocol: 'https', hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com' },
      { protocol: 'https', hostname: 'sbqtqbfkhryqtetytzfi.supabase.co', pathname: '/storage/v1/object/public/medusa-db/**' },
      { protocol: 'https', hostname: 'blogger-production-0439.up.railway.app', pathname: '/uploads/**' },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Cho phép link ảnh ảo
      },
     {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Cấp phép cho ảnh Unsplash
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Cho phép tất cả các đường dẫn từ Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc', // Cho phép avatar từ Pravatar
      },

    ],
  },
}

export default nextConfig
