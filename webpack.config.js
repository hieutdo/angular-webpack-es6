var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var APP_PATH = path.resolve(SRC_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var common = {
  entry: {
    app: path.resolve(APP_PATH, 'app.js')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: APP_PATH
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: APP_PATH
      },
      {
        test: /\.html$/,
        loaders: ['html'],
        include: APP_PATH
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loaders: [
          'url?limit=10000&name=images/[name].[hash:5].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url?limit=10000&name=fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      inject: 'body'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    debug: true,
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      port: 9100,
      inline: true,
      hot: true,
      historyApiFallback: true
    }
  });
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    devtool: 'source-map',
    debug: false,
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        }
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles/app.[chunkhash].css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
