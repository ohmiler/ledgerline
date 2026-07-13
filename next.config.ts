import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/ledgerline" : "",
  assetPrefix: isGitHubPages ? "/ledgerline/" : "",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
