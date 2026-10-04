/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/playpower-take-home-assignment',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
};

module.exports = nextConfig;
