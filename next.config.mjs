/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  assetPrefix: 'https://storage.googleapis.com/cloud-computing-web-ui-app/', // comment this out when deploying locally
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
export default nextConfig
