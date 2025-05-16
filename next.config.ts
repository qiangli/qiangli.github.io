import { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  reactStrictMode: true,
};

export const dynamic = "force-static";
export default withContentlayer(nextConfig);
