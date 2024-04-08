module.exports = {
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ],
  // transpileDependencies: true,
  // devServer:{
  //   proxy:{
  //     '/api': {
  //       target: 'http://127.0.0.1:8083',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/api': ''
  //       }
  //     }
  //   }
  // },
  
  // rules: {x
  //   'no-console': 'off', // Disable the rule globally for development
  // },
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  
}
