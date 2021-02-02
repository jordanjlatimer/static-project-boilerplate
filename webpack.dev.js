const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let pages = {
  entries: {},
  pluginObjects: [],
};

/*Get all slam pages in the src directory*/
const pageNames = fs
  .readdirSync(path.resolve(__dirname, "src/pages"))
  .filter(filename => path.extname(filename).toLowerCase() === ".js")
  .map(name => path.basename(name, ".js"))
  .forEach(name => {
    /*Create an object with the entry path and plugin objects for each page.*/
    pages.entries[name] = path.resolve(__dirname, "src/js/", name + ".js");
    pages.pluginObjects.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/pages/" + name + ".js"),
        filename: name + ".html",
        chunks: [name],
      })
    );
  });

module.exports = {
  mode: "development",
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    stats: "minimal",
  },
  performance: {
    hints: false,
  },
  plugins: [...pages.pluginObjects],
};
