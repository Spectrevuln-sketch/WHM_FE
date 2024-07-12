/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    // Define aliases for paths
    config.resolve.alias['@helpers'] = path.join(__dirname, 'src/helpers');
    config.resolve.alias['@middleware'] = path.join(__dirname, 'src/middleware');
    config.resolve.alias['@usecase'] = path.join(__dirname, 'src/middleware');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Redirect is permanent (301)
      },
    ];
  },
};

module.exports = nextConfig;