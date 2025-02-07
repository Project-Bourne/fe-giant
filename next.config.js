/**  */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: [
    //   '192.81.213.226',  // Add the IP address
    //   'localhost',
    //   process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS, // Also allow the environment variable IP
    // ],
    // localPatterns: [
    //   {
    //     pathname: '/images/**',
    //   },
    //   {
    //     pathname: '/icons/**',
    //   },
    //   {
    //     pathname: '/svg/**',
    //   }
    // ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.81.213.226",
        port: "81",
        pathname: "/89/api/v1/download/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS,
        port: "81",
        pathname: "/89/api/v1/download/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

// const nextConfig = {
//   reactStrictMode: true,
//   basePath: "/30"
// }
// module.exports = nextConfig
