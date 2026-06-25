/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
