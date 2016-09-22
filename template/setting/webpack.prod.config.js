const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const alias = {
    src: path.resolve(__dirname, './src'),
    assets: path.resolve(__dirname, './src/assets'),
    components: path.resolve(__dirname, './src/components'),
    views: path.resolve(__dirname, './src/views')
}


module.exports = {
    devtool: "#inline-source-map",
    entry: {
        vendor: ['vue', 'vuex', 'lodash', 'echarts','vue-resource', 'bootstrap', 'jquery','moment','assets/lib/easyui/js/jquery.easyui.min','assets/lib/easyui/js/easyuizhCN'],
        app: './src/main',
    },
    output: {
        path: path.resolve(__dirname, './static'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: alias
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg?g|gif)$/,
                loader: ['url?limit=10000&name=./images/[name].[ext]']
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
            minChunks: Infinity
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: "",
            template: path.join(__dirname, './index.html'),  //模板文件
            inject: 'body',
            hash: false,    //为静态资源生成hash值
            minify: {    //压缩HTML文件
                removeComments: false,    //移除HTML中的注释
                collapseWhitespace: true,    //删除空白符与换行符
                removeAttributeQuotes: true
            },
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            moment:"moment",
            "window.jQuery": "jquery"
        })
    ]
}


