const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      "/api/*": {
        target: process.env.API_THINGS,
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
        pathRewrite: { "/api/*": "/" }
      }
    }
  }
})
