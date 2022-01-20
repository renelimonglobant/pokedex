///** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    disable: prod ? false : true,
    runtimeCaching,
  },
});
