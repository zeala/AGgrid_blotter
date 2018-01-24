const webpack = require('webpack');
const awesomeTypeScriptLoader = require('awesome-typescript-loader');

const merge = require('webpack-merge').strategy({
  plugins: 'replace'
});

module.exports = merge(
  require('./webpack.base.config'),
  {
    devtool: 'inline-source-map',
    plugins: [
      new awesomeTypeScriptLoader.CheckerPlugin(),
      new webpack.DefinePlugin({
        'application.version': JSON.stringify('0.0.0')
      })
    ]
  }
);
