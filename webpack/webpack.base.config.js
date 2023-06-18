const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const webpack = require('webpack')

const alias = require('./alias')
const dynamicAppConfig = require('../app.config.json')
const packageJson = require('../package.json')

const copyWebpackPluginConfig = {
  patterns: [],
}
if (dynamicAppConfig !== null) {
  copyWebpackPluginConfig.patterns.push({
    from: './app.config.json',
    to: `${resolve('public')}/app.config.json`,
  })
}
// eslint-disable-next-line no-console
console.log('appConfig', dynamicAppConfig)

const bufferModule = require.resolve('buffer/')
const processModule = require.resolve('process/browser.js')

const config = {
  entry: './src/index.tsx',
  target: ['web', 'es2017'],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[ext]',
    path: resolve('public'),
    publicPath: '/',
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.ts', '.tsx', '.mjs'],
    fallback: {
      buffer: bufferModule,
      crypto: false,
      stream: false,
      zlib: false,
      process: processModule,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve('./src'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: resolve('./src'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(png|jpg|gif|pdf|csv|xls)$/,
        type: 'asset',
      },
      {
        test: /\.svg?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              svgo: false,
              prettier: false,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      dynamicAppConfig: JSON.stringify(dynamicAppConfig),
      version: packageJson.version,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'font',
      include: 'allAssets',
      fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      ROOT_URL: JSON.stringify(process.env.ROOT_URL) || '""',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin(copyWebpackPluginConfig),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
}

module.exports = config
