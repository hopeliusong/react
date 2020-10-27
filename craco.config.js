const path = require("path");
const pxtoviewport = require("postcss-px-to-viewport");

module.exports = {
  webpack: {
    alias: {
      "@redux": path.resolve(__dirname, "./src/redux"),
    },
  },
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375,
        }),
      ],
    },
  },
};
