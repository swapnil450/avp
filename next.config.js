/** @type {import('next').NextConfig} */
// tailwind.config.js
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  env: {
    GRAPHQL_SERVER: "https://serverlisting.vercel.app/graph",
    SHIPPING: "Pays To Our Delivery Partner",
    Discount: "10"
  }
};
