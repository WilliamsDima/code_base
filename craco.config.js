const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@storybook': path.resolve(__dirname, 'src/stories'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@templates': path.resolve(__dirname, 'src/components/templates'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@nanigations': path.resolve(__dirname, 'src/nanigations'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@appTypes': path.resolve(__dirname, 'src/appTypes'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
}
