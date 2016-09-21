/**
 * Created by yelingfeng on 2016/9/12.
 */
var path = require('path')

var venderPlugin = [
    'vue','vuex','lodash','echarts','vue-resource',
    'bootstrap','jquery','moment',
    'assets/lib/easyui/js/jquery.easyui.min',
    'assets/lib/easyui/js/easyuizhCN'
]

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        venders :venderPlugin
    },
    dev: {
        env: require('./dev.env'),
        port: 8100,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        venders :venderPlugin,
        cssSourceMap: false
    }
}