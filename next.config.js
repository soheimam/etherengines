/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0x407794B377c13E7242c77053c18FfB196a481132",
    ORACLE_ADDRESS: "0xB34cFc9dBfc555290B8345978992B6A4f7B14aF3",
    TOKEN_ADDRESS: "0xc21A904117530E34D44cca524496EfDf41022B22",
    METAFUSE_PROJECT_ID: "3ac14127-abd6-43ef-be99-c9fc635088cf",
    METAFUSE_API_KEY: "5bcd940e-a02f-4b27-a054-6f8932bdb25e",
    METAFUSE_ITEMS_GATEWAY: "https://gateway.metafuse.me/v1/item",
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

// Oracle Deployed to -> 0xB34cFc9dBfc555290B8345978992B6A4f7B14aF3
// Token Deployed to -> 0xc21A904117530E34D44cca524496EfDf41022B22
// Canvas Deployed to -> 0x407794B377c13E7242c77053c18FfB196a481132
