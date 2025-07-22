// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cuna-api-unsa-nine.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
}