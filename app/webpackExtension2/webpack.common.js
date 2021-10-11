const path = require("path");

const RunChromeExtension = require("webpack-run-chrome-extension");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  entry: {
    test: [path.resolve(__dirname, "./src/content/test.ts")],
  },
  plugins: [
    new RunChromeExtension({
      extensionPath: "dist/",
      autoReload: true,
      port: 8081,
    }),
  ],
};
