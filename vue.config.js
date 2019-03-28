module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? "/fedemo/pages/f9skinbuilder/" : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/ep': {
        target: 'http://locahost',
        ws: false,
        changeOrigin: true,
        router: {
          '192.168.118.47:8080/ep': 'http://localhost',
          'localhost:8080/ep': 'http://localhost'
        }
      }
    }
  }
}