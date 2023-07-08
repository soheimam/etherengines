/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0x1348c7913C8889dF8cb1dF6d8B372ea97bf3edAC",
    ORACLE_ADDRESS: "0x52B2B689DC54efF37c42E678e3991267D5BCE79C",
    TOKEN_ADDRESS: "0x02558C1890aB8ecaB130f9FaBe0535918F2F724a",
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
