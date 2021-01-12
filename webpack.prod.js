const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "umd",
  },
  resolve: {
    extensions: [".tsx", ".js"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
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
    minimize: true,
    mangleExports: "size"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../dev/report.html",
      openAnalyzer: false,
    }),
    new CompressionPlugin(),
  ],
  performance: {
    hints: "warning"
  }
};
