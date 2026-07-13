import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProduction ? "/ledgerline" : "",
  assetPrefix: isProduction ? "/ledgerline/" : "",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
