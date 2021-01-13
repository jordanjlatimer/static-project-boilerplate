const path = require("path");
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  mode: "development",
  entry: pages.entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
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
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
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
    open: true,
    stats: "minimal"
  },
  performance: {
    hints: false
  },
  plugins: [
    ...pages.pluginObjects
  ]
};
