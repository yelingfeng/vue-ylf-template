var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')


var HappyPack = require('happypack');
var pool = HappyPack.ThreadPool({
    size:2
});

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babelJs',
                exclude: /node_modules/,
                include: [path.resolve(__dirname, '../src')]
            }
        ].concat(utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }))
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
            template: path.join(__dirname,'./index.html'),  //模板文件
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
        new HappyPack({
            id: 'babelJs',
            threadPool: pool,
            loaders: ['babel?cacheDirectory=true'],
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
})
















var path = require('path')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')


var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');
var pool = HappyPack.ThreadPool({
  size:5
});

var alias =  {
  src: path.resolve(__dirname, './src'),
  assets: path.resolve(__dirname, './src/assets'),
  components: path.resolve(__dirname, './src/components'),
  views: path.resolve(__dirname, './src/views'),
}


module.exports = {
  devtool: '#source-map',
  entry: {
    vendor: ['vue','vuex','lodash','echarts','vue-resource','bootstrap','jquery','moment','assets/lib/easyui/js/jquery.easyui.min','assets/lib/easyui/js/easyuizhCN'],
    bundle: './src/main'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash:8].[name].js',
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
        loader: 'happypack/loader?id=babelJs',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')]},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader :'style-loader',
          loader :  'css-loader?sourceMap'
        })
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg?g|gif)$/,
        loader: ['url?limit=10000&name=images/[hash:8].[name].[ext]']
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }
    ]
  },
  plugins: [
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
      template: path.join(__dirname,'./index.html'),  //模板文件
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
    new HappyPack({
      id: 'babelJs',
      threadPool: pool,
      loaders: ['babel?cacheDirectory=true'],
      verbose: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
}

