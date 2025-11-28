import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
      },
    ],
    domains: [
      "example.com",
      "k.kakaocdn.net",
      "kauoiizupgmbaysdnmce.supabase.co",
    ],
  },
};

export default nextConfig;
