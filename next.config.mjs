const nextConfig = {
  output: 'standalone',
  webpack: (/** @type {{ externals: string[]; }} */ config) => {
    config.externals.push('pino-pretty');
    return config;
  },
};

export default nextConfig;
