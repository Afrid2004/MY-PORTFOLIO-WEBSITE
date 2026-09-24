/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-34bcafdece07465c8d280278b20ecf5b.r2.dev",
      },
    ],
  },
};

export default nextConfig;
