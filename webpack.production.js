var base = require('./webpack.config');
var merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'none',

  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: 'workers/[name].[contenthash].js',
  },
});
