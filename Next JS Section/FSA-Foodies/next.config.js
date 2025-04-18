/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb" // Increase the limit to 8MB
    }
  }
};

module.exports = nextConfig;
