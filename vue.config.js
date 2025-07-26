// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',

  devServer: {
    proxy: {
      '/api': {
        target: 'https://cuna-unsa-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
}
