/**
 * Created by yelingfeng on 2016/9/12.
 */
var path = require('path')
const pkg = require('../package')
const venderPlugin = Object.keys(pkg.dependencies)

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
        apiPort : 8400,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        venders :venderPlugin,
        cssSourceMap: false
    }
}