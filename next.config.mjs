/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.holidify.com',
      },
    ],
  },
};

export default nextConfig;
