const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
//const webpack = require("webpack");

const ENV = process.env.NODE_ENV || "development";

module.exports = {
  mode: ENV,
  devtool: "cheap-module-eval-source-map",
  entry: [
    "babel-polyfill",
    "./app/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ],
  optimization: {
    noEmitOnErrors: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, "app")
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env", "react"],
              plugins: ["transform-runtime", "react-hot-loader/babel"]
            }
          }
        ]
      }
    ]
  }
};