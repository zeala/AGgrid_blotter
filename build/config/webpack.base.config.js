var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var awesomeTypeScriptLoader = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var rootDir = path.join(__dirname, '..', '..');
var modulesDir = path.join(rootDir, 'node_modules');
var outputDir = path.join(rootDir, 'dist');
var emptyShim = path.join(__dirname, 'empty.shim.js');

var exec = require('sync-exec');

module.exports = {
  context: rootDir,
  entry: {
   /* main: ['.src/Main.ts']*/
  },
  output: {
    path: outputDir,
    filename: 'scripts/[name].bundle.js'
  },
  resolve: {
    modules: [modulesDir],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl', '.css'],
    alias: {
      // For bunyan: {
      'dtrace-provider': emptyShim,
      fs: emptyShim,
      'safe-json-stringify': emptyShim,
      mv: emptyShim,
      'source-map-support': emptyShim
      // }
    }
  },
  module: {
    rules: [
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader',
        exclude: [modulesDir]
      },
      {
        test: /[^.].\.tsx?$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: [modulesDir]
      },
      {
        test: /[^.].\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [modulesDir],
        options: {
          // make sure tsconfig.json loads from the root, and is not dependent on the folder where webpack/karma runs from
          configFileName: path.join(rootDir, 'tsconfig.json')
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        exclude: [modulesDir]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ],
        exclude: [modulesDir]
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader?browsers=last 2 version', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.png|ico$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.mp3|webm|ogg$/,
        loader: 'file-loader',
        options: {
          name: 'audio/[name].[ext]'
        }
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          name: 'config/[name].[ext]'
        },
        exclude: [modulesDir]
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new awesomeTypeScriptLoader.CheckerPlugin(),
    new webpack.DefinePlugin({
      'application.version': JSON.stringify('1.0.0')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'scripts/vendor.js',
      minChunks: function(module) {
        return (
          module.resource && module.resource.indexOf('node_modules') !== -1
        );
      }
    }),
    new HtmlWebpackPlugin({
      title: 'NFEx',
      template: 'build/template/index.ejs',
      filename: 'index.html',
      favicon: 'src/assets/images/favicon.ico',
      chunks: ['main', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'NFEx - Popout',
      filename: 'popout.html',
      chunks: ['popout', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'NFEx - Notification',
      filename: 'notification.html',
      chunks: ['notification', 'vendor']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../build/openfin/*.*'),
        to: './openfin/[name].[ext]'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../config/openfin/*.*'),
        to: './openfin/[name].[ext]'
      }
    ])
  ]
};
