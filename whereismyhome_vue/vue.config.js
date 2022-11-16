const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      '^/v1':{
        "target":'https://openapi.naver.com/',
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "secure":false
      }
    },
  }
});
