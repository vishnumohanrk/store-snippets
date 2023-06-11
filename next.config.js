/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    typedRoutes: true,
    serverActions: true,
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma'],
  },
};

module.exports = nextConfig;
