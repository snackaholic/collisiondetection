const path = require('path');

module.exports = {
  devtool: "source-map",
  entry: './ts-output/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};