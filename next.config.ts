import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["spoonacular.com", "img.spoonacular.com"], // add any domains you fetch images from
  },
};

export default nextConfig;
