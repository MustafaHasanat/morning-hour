/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    tsconfigPath: "./tsconfig.json",
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['cdn.sanity.io'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
