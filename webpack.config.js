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
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: "3",
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
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
