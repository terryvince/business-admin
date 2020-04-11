module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://shopping.zhjl.link",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
