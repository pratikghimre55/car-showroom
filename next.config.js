/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Wildcard to allow any hostname
          port: '',
          pathname: '/**', // Allows any path and query parameters
        },
      ],
    },
  }
  
  module.exports = nextConfig