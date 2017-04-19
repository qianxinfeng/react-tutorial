const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
// 如果需要将构建资源放到cdn，则配置cdn地址如:https://xxx.cdn.com/,否则设置为空
const publicPath = '';

module.exports = function (options) {
  options = options || {};
  return {
    entry: {
      index: './src/main.js',
      vendor: './src/vendor.js',
    },
    output: {
      path: resolve(__dirname, './dist'),
      filename: options.dev ? '[name].js' : '[name]-[chunkhash:6].js',
      chunkFilename: '[id]-[chunkhash:6].js',
      publicPath: options.dev ? '/.tmp/' : publicPath
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              root: resolve(__dirname, 'src'),
              attrs: ['img:src', 'link:href']
            }
          }]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /favicon\.png$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:6].[ext]'
            }
          }]
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [{
            loader: 'url-loader',
            options: {
              //小于10kb的转base64
            limit: 10*1000,
            name: 'assets/[name]-[hash:6].[ext]'
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        'react$': 'react/lib/ReactWithAddons.js',
        '~': resolve(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ],
    devServer: {
      host: '127.0.0.1',
      port: 8010,
      proxy: {
        '/api/': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      },
      historyApiFallback: {
        index: url.parse(options.dev ? '/.tmp/' : publicPath).pathname
      }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
  }
};