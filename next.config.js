/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // CANVAS_ADDRESS: "0x5Ce48f7832dD9CC53c099b70D86A4339cD8a8E9C",
    // ORACLE_ADDRESS: "0x7dA221C261F8d7fd5187560d573Beba7e4c9A53A",
    // TOKEN_ADDRESS: "0xaB79931EfF8b8C151F4f89D7Eb096718455786aA",
    CANVAS_ADDRESS: "0xB9D46A0F63499e75269096e0E2DD7e3137cab04A",
    ORACLE_ADDRESS: "0xCb96Dca78689b5d2Cb9055576cA5FcC124F4BE4b",
    TOKEN_ADDRESS: "0x5688eA561963b40558Ba24230Ee507AD01ED12e5",
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
// Oracle Deployed to -> 0xCb96Dca78689b5d2Cb9055576cA5FcC124F4BE4b
// Token Deployed to -> 0x5688eA561963b40558Ba24230Ee507AD01ED12e5
// Canvas Deployed to -> 0xB9D46A0F63499e75269096e0E2DD7e3137cab04A
