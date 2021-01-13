const path = require("path");
const fs = require("fs")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssWebpackPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

//Find out what all the pages are.
const pageNames = fs.readdirSync("./src").filter(filename => path.extname(filename).toLowerCase() === ".html").map(name => path.basename(name, ".html"))

let pages = {entries: {}, pluginObjects: []} 
pageNames.forEach(name => {
  pages.entries[name] = "./src/js/" + name + ".js";
  pages.pluginObjects.push(new HtmlWebpackPlugin({
    template: "./src/" + name + ".html",
    filename: name + ".html",
    chunks: [name]
  }))
})

module.exports = {
  mode: "production",
  entry: pages.entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".sass"],
  },
  module: {
    rules: [
      {
        test: /\.sass?$/,
        exclude: /node_modules/,
        use: [
          MiniCssWebpackPlugin.loader,
          "css-loader",
          "sass-loader" 
        ],
      }
    ],
  },
  optimization: {
    minimize: true,
    mangleExports: "size"
  },
  plugins: [
    ...pages.pluginObjects,
    new CleanWebpackPlugin(),
    new MiniCssWebpackPlugin(),
    new CompressionPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/*",
          context: "./src",
          noErrorOnMissing: true
        }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../dev/report.html"
    }),
  ],
  performance: {
    hints: "warning"
  }
};
