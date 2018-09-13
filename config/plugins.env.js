const envs = require('./dev.deomin');
const pluginsDomain  = envs[process.env.NODE_ENV].plugins+'/plugins';
const time = (new Date()).getTime();
const jsFiles = [
    pluginsDomain+'/nav/1.0.0/nav.js'+'?version='+time,
    'https://web.krspace.cn/kr-op/echarts/4.1.0/echarts.min.js',
    'https://web.krspace.cn/kr-op/umeditor/ueditor.config.js',
    'https://web.krspace.cn/kr-op/umeditor/ueditor.all.js',
    'https://web.krspace.cn/kr-op/umeditor/lang/zh-cn/zh-cn.js',
    'https://web.krspace.cn/kr-op/go/1.8.14/go.js',
    'https://web.krspace.cn/plugins/watermark.js',
    // '/static/umeditor/1.0.0/ueditor.config.js',
    // '/static/umeditor/1.0.0/ueditor.all.min.js',
    // '/static/umeditor/1.0.0/lang/zh-cn/zh-cn.js',
]
const cssFiles = [
    'https://web.krspace.cn/kr-op/iview/2.8.0/styles/iview.css',
    pluginsDomain+'/nav/1.0.0/nav.css',
    pluginsDomain+'/public/css/main.css',
    pluginsDomain+'/public/images/favicon.ico',
    pluginsDomain+'/public/icomoon/1.0.0/style.css'
]

module.exports = {
    jsFiles,
    cssFiles
};

