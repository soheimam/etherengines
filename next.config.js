/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0xbE56E2377200c5756b763BFD2166a0Db3776D6b1",
    ORACLE_ADDRESS: "0x6ECe3928B56d6a8A3EF9B557c2A9c50427e0C8a2",
    TOKEN_ADDRESS: "0x1dBe9A2ae5900122F169Ef8DB88FC30506c06316",
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
