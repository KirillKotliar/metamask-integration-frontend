const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const SentryCliPlugin = require('@sentry/webpack-plugin')
const pack = require('../package.json')

const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[name].[contenthash].css',
    }),
    new SentryCliPlugin({
      include: '../src',
      org: 'web3tech',
      authToken: '9d35602554b241e69773d1f70c5e37c75e8b0214f72948fd9649f5b6d1f72177',
      release: `voting@${pack.version}`,
      project: 'voting',
    }),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          output: {
            ecma: 2017,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
}

module.exports = config
