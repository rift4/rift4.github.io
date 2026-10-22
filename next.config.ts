import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The site is fully static. Exporting to `out/` keeps it deployable to
   * GitHub Pages and Vercel alike, with no server runtime.
   */
  output: "export",
  /** Emit `route/index.html` so plain static hosts resolve every route. */
  trailingSlash: true,
};

export default nextConfig;
