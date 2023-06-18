module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults, not ie 11, not ie_mob 11',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-styled-components',
      {
        fileName: false,
        ssr: false,
        pure: true,
      },
    ],
  ],
}
