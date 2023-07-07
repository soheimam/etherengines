/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CANVAS_ADDRESS: "0x23C32F481b58CE43b772a68E637113a210f4d437",
    ORACLE_ADDRESS: "0xD470A68fc96d50096569eeA794a0999280F174EA",
    TOKEN_ADDRESS: "0x891860938A1d6A7D969E4219aF2bbBF8aA11d06d",
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
