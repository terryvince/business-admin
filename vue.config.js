module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://shopping.zhjl.link",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
