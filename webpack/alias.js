// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')

module.exports = {
  src: resolve('src'),
  styles: resolve('src', 'assets', 'styles'),
  img: resolve('src', 'assets', 'images'),
  icons: resolve('src', 'assets', 'icons'),
  docs: resolve('src', 'assets', 'docs'),
  store: resolve('src', 'store'),
  api: resolve('src', 'api'),
  components: resolve('src', 'components'),
  pages: resolve('src', 'pages'),
  types: resolve('src', 'types'),
  utils: resolve('src', 'utils'),
  constants: resolve('src', 'constants'),
}
