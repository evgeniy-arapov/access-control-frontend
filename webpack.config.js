const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");

module.exports = {
  mode: ENV,
  target: "web",
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
    new webpack.DefinePlugin({
      "typeof window": "\"object\""
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      //filename: "[name].css",
      //chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ],
  optimization: {
    noEmitOnErrors: true
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules", "bower_components"],
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, "app")
        ],
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
              presets: ["env", "react", "stage-0"],
              plugins: ["transform-runtime", "react-hot-loader/babel"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
};