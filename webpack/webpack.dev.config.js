const prefixAddress = (address) => {
  if (!process.env.BASE_ADDRESS) {
    return address
  }
  if (address.startsWith('http')) {
    return address
  }
  return process.env.BASE_ADDRESS + ('/' + address).replaceAll('//', '/')
}

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: process.env.DEV_SERVER_PORT,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'error',
    },
    proxy: {
      '/backendAddress/*': {
        target: prefixAddress(process.env.BACKEND_ADDRESS),
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        withCredentials: true,
        pathRewrite: {
          '/backendAddress': '',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
}
module.exports = config
