/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0x9DC39Eee89859539c20adf6DC96AF301cC065142",
    ORACLE_ADDRESS: "0x86e233079243aaF1aBe14B6714562B5C33623683",
    TOKEN_ADDRESS: "0x8D1b3ea9240dfCf4B4133C2C5D87B9a25D057325",
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
