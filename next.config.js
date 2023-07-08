/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0x1175853621Fe385176A94895bb2a87A646b2CB86",
    ORACLE_ADDRESS: "0xc21A904117530E34D44cca524496EfDf41022B22",
    TOKEN_ADDRESS: "0x407794B377c13E7242c77053c18FfB196a481132",
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: ["api.metafuse.me"],
  },
};

module.exports = nextConfig;
