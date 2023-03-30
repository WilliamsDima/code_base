const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@storybook': path.resolve(__dirname, 'src/stories'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
    },
  },
}
