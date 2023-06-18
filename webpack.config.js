const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
dotenv.config()
const base = require('./webpack/webpack.base.config.js')

module.exports = () => {
  const ENV = process.env.NODE_ENV || 'development'

  let clientConfig

  switch (ENV) {
    case 'development': {
      const dev = require('./webpack/webpack.dev.config.js')
      clientConfig = merge(base, dev)
      break
    }
    case 'production': {
      const prod = require('./webpack/webpack.prod.config.js')
      clientConfig = merge(base, prod)
      break
    }
  }

  return clientConfig
}
