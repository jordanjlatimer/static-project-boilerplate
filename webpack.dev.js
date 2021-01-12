const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/pages/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    //library: "umd",
  },
  resolve: {
    extensions: [".js", ".css", ".sass"],
  },
  module: {
    rules: [
      {
        test: /\.sass?$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: "style-loader" 
          }, 
          { 
            loader: "css-loader" 
          }, 
          { 
            loader: "sass-loader" 
          }
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "./src"),
    port: 3000,
    inline: true,
    stats: "minimal"
  },
  performance: {
    hints: false
  }
};
