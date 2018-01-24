const webpack = require('webpack');

module.exports = {
  entry: {
    main: [ 'eventsource-polyfill' ],
    popout: [ 'eventsource-polyfill' ],
    notification: [ 'eventsource-polyfill' ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      exclude: /vendor\.js$/,
      columns: false
    })
  ],
  devServer: {
    hot: true,
    noInfo: true,
    port: 3000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
