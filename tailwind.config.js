/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      daisyui: {
        themes: [
          {
            pitstop: {
              primary: "#d6d6d6",
              "primary-focus": "#e6e6e6",
              "primary-content": "#000000",

              secondary: "#2D8FB9",
              "secondary-focus": "#1a617f",
              "secondary-content": "#ffffff",

              accent: "#503447",
              "accent-focus": "#32202c",
              "accent-content": "#ffffff",

              neutral: "#171618",
              "neutral-focus": "#2e2d2f",
              "neutral-content": "#dca54c",

              "base-100": "#0171717",
              "base-200": "#171618",
              "base-300": "#2e2d2f",
              "base-content": "#dca54c",

              info: "#66c7ff",
              success: "#87cf3a",
              warning: "#e1d460",
              error: "#ff6b6b",

              "--rounded-box": "1rem",
              "--rounded-btn": ".5rem",
              "--rounded-badge": "1.9rem",

              "--animation-btn": ".25s",
              "--animation-input": ".2s",

              "--btn-text-case": "uppercase",
              "--navbar-padding": ".5rem",
              "--border-btn": "1px",
            },
          },
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
