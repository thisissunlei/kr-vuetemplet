const env = process.env.NODE_ENV;
const deomin = require('./dev.deomin');
console.log( deomin[env],"ppppp")
module.exports = {
    '/api': {
        target: deomin[env].plugins, // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '/api'
        }
    },
    '/rap': {
        target: 'http://rap.krspace.cn', // rap联调接口
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '/api'
        }
    },
    '/ben': {
        target: 'http://rap.krspace.cn', // 本地联调ip
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '/api'
        }
    }
}