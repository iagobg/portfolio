import { projectRedirects } from "./lib/project-aliases.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  redirects: async () => projectRedirects(),
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
