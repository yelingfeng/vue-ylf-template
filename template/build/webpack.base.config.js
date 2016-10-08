/**
 * Created by yelingfeng on 2016/9/12.
 */
var path = require('path')
var config = require('../config/index')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        vendor: config.build.venders,
        app: './src/main'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[hash:8].[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.jsx'],
        alias:   {
            src: path.resolve(__dirname, '../src'),
            assets: path.resolve(__dirname, '../src/assets'),
            components: path.resolve(__dirname, '../src/components'),
            views: path.resolve(__dirname, '../src/views'),
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                include: projectRoot,
                loader: 'vue'
            },
            {
                test: /\.js|\.jsx$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
}

