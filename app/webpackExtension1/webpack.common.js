const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.tsx",
    background: "./src/background/index.ts",
    content: "./src/content/index.ts",
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }], // do not forget to change/install your own TS loader
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({ template: "src/popup/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        // { from: "./src/icons/icon16.png" },
        // { from: "./src/icons/icon48.png" },
        // { from: "./src/icons/icon128.png" },
      ],
    }),
  ],
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") }, // chrome will look for files under dist/* folder
};
