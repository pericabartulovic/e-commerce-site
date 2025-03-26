const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Proxy API requests to the backend
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/images': '/images' },
        changeOrigin: true,
      },
    },
  },
});
