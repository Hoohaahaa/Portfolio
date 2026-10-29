import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {distDir:process.env.PZ_BUILD_DIRECTORY??'.next'};

export default withEve(nextConfig);
