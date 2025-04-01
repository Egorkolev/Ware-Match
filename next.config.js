/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'warematch.s3.amazonaws.com',
        pathname: '/listing_images/**',
      },
    ],
  },
  // For Turbopack
  experimental: {
    // Disable Turbopack banner
    turbo: {
      rules: {
        // Empty rules array
      }
    }
  }
};

module.exports = nextConfig; 