var config = require('../config/index')
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity //Infinity
        }),
        new ExtractTextPlugin({
            filename : '[hash:8].style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: "",
            template: path.join(__dirname,'../index.html'),  //模板文件
            inject:'body',
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:true,    //删除空白符与换行符
                removeAttributeQuotes: true
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
           options:{
               vue: {
                   loaders: utils.cssLoaders()
               }
           }
        })
    ]
})



