const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(
  require('./webpack.base.config'),
  require('./webpack.dev.server'),
  {
    entry: {
      main: [ './src/ProfileApplication.ts' ]
    },
    devServer: {
      hot: false
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../../config/app.config.LOCAL.json'),
          to: './config/app.config.json'
        }
      ])
    ]
  }
);
