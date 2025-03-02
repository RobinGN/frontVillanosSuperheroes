import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
