import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yilyextczirtxzslnuhx.supabase.co",
      },
    ],
  },
};

export default nextConfig;