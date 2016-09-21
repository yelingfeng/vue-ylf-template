/**
 * Created by yelingfeng on 2016/9/12.
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
})
