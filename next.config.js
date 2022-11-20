/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-cdn.myanimelist.net',
        port: '',
      },
    ]
  },
}

module.exports = nextConfig
