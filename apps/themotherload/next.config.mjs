import { execSync } from 'node:child_process';

/**
 * Compute a short build identifier so the running site can advertise which
 * commit it shipped from. Vercel injects VERCEL_GIT_COMMIT_SHA at build time;
 * locally we fall back to `git rev-parse` so dev shows your working SHA, and
 * to 'dev' if neither is available (e.g. someone running outside a git repo).
 */
function resolveBuildId() {
  const fromVercel = process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromVercel) return fromVercel.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'dev';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  env: {
    // Public — safe to expose; it's already on GitHub. Surfaced in the
    // footer so we can verify what version of the code is actually live.
    NEXT_PUBLIC_BUILD_SHA: resolveBuildId(),
  },
  /**
   * Static HTML in /public is served at its on-disk URL (e.g.
   * /context-builder.html). Mint Condition gets clean URLs for free via
   * vercel.json `cleanUrls: true`; the Motherload app needs an explicit
   * rewrite so /context-builder resolves to the same file across both
   * brands, matching what's referenced in the workbook PDFs.
   */
  async rewrites() {
    return [
      { source: '/context-builder', destination: '/context-builder.html' },
    ];
  },
};

export default nextConfig;
