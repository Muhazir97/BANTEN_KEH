const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
  devServer: {
    proxy: 'http://localhost/banten_keh_be_lumen/public/'
  },

  lintOnSave: true,

  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets')
      }
    }
  },

  css: {
    sourceMap: true
  },


  // css: {
  //   loaderOptions: {
  //     css: {
  //       sourceMap: process.env.NODE_ENV !== "production" ? true : false
  //     }
  //   }
  // },
  
  publicPath: '/banten_keh_build/',
  assetsDir: 'assets',
  outputDir: 'C:/xampp/htdocs/banten_keh_build'
};
