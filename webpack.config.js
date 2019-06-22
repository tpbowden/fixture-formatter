const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  mode: production ? "production" : "development",
  entry: "./src/main.js",
  output: {
    publicPath: production ? "dist" : undefined,
    path: path.join(__dirname, "./dist"),
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html.ejs"
    })
  ]
};
