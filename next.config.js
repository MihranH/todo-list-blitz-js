// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withBlitz } = require('@blitzjs/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withBlitz(nextConfig);
