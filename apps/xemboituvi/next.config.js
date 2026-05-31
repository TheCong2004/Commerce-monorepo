/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Di chuyển vào đây để Next.js 14 nhận diện đúng
    serverExternalPackages: ['astronomy-engine'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['astronomy-engine'],
};

module.exports = nextConfig;