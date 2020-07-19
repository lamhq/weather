require('dotenv').config();

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
var https = require('https');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    open: true,
    contentBase: './dist',
    historyApiFallback: true,
    port: 3001,
    proxy: {
      '/api': {
        agent: https.globalAgent,
        followRedirects: true,
        target: 'https://www.metaweather.com',
        headers: {
          host: 'www.metaweather.com',
        },
      },
    },
  },
  plugins: [
    // Enables Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
});
