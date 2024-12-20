/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Don't run ESLint during builds
      ignoreDuringBuilds: true,
    },
    // Add other config options as needed
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;