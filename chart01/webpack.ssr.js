'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
const glob = require('glob')
const webpack = require('webpack')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFile = glob.sync(path.join(__dirname, 'src/*/index-server.js'))
  Object.values(entryFile).map(filePath => {
    const match = filePath.match(/src\/(.*)\/index/)
    const pageName = match && match[1]
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [`${pageName}`]
      })
    )
    entry[pageName] = filePath
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-server.js',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /.html$/,
        use: 'inline-html-loader'
      },
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
          'less-loader',
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              options: {
                limit: 100,
              }
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new HTMLInlineCSSWebpackPlugin(),
    function() {
      this.hooks.done.tap('done', stats => {
        // console.log('stats', stats)
        console.log('stats.compilation.errors', stats.compilation.errors)
        console.log('length', stats.compilation.errors.length)
        if(stats.compilation.errors && 
           stats.compilation.errors.length
        ) {
          console.log("Build Error");
          process.exit(1);  // 非 0 表示失败
        }
      })
    } 
    // new webpack.optimize.ModuleConcatenationPlugin()
  ].concat(htmlWebpackPlugins),
  optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserWebpackPlugin(),
  //     new CssMinimizerPlugin(),
  //   ],
  //   splitChunks: {
  //     cacheGroups: { // 缓存组
  //       commons: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors', // 拆分 chunk 的名称
  //         chunks: 'all' // all 可能特别强大, chunk 可以在异步和非异步 chunk 之间共享
  //       }
  //     }
  //   }
  }
};