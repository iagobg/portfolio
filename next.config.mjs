import { projectRedirects } from "./lib/project-aliases.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects: async () => projectRedirects(),
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
