/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable trace file — avoids Windows EPERM on .next/trace when
  // OneDrive / antivirus holds the file open mid-build.
  experimental: {
    instrumentationHook: false,
  },
  outputFileTracing: false,
};

export default nextConfig;
