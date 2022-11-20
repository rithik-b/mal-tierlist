/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-cdn.myanimelist.net',
      },
    ]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
}

module.exports = nextConfig
