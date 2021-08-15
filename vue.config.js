module.exports = {
  devServer: {
    proxy: 'http://localhost/banten_keh_be_lumen/public/'
  },

  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  }
};
