const path = require("path")
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = {
  entry: {
    "mps-report": "./src/index.ts"
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve(".")],
    extensions: [".js", ".json", ".ts"],
    alias: {
      // keep this is as there is a clash between Babel and Postgres:
      // https://stackoverflow.com/questions/41522744/webpack-import-error-with-node-postgres-pg-client
      'pg-native': '../../../../src/lib/dummyPgNative.js'
    }
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "..", "build"),
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "14"
                  }
                }
              ],
              ["@babel/preset-typescript"]
            ]
          }
        }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
}
