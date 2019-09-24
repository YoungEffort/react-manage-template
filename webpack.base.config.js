/*
   webpack.base.config.js 开发环境和生产环境都需要使用的配置
   秦国胜
   2019-08-05
*/

const path = require('path');
const webpack = require('webpack');
//const os = require('os');

//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理本地打包文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

//这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//多线程打包
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });
module.exports={
   //输入
   entry: {
      main: [ path.resolve(__dirname,'./src/index.jsx') ]
   },
   //输出
   output: {
      filename: 'js/[name].[hash:8].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'js/[name].js'
   },
   // 只在错误的时候输出日志
   stats: 'errors-only',
   //提取公共代码
   optimization: {
      splitChunks: {
         chunks:'all',
         minSize: 40000,
         cacheGroups:{
            // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
            vendor: {
               test: /node_modules/,
               name: 'vendor',
               priority: -10,
               enforce: true
            },
            // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
            common: {
               name: 'common',
               minChunks: 2,
               minSize: 30000,
               priority: 1,
               reuseExistingChunk: true
            }
         }
      }
   },
   //loader 配置
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: [ path.resolve('src') ],// 限定范围
            use:[ 'happypack/loader?id=babel','babel-loader?cacheDirectory' ]
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               //'style-loader',
               'css-loader',
               'postcss-loader'
            ]
         },
         {
            test: /\.less$/,
            use: [
               MiniCssExtractPlugin.loader,
               //'style-loader',
               'css-loader',
               'less-loader',
               'postcss-loader',
               {
                  loader:'less-loader?sourceMap=true',
                  options:{
                     javascriptEnabled: true
                  }
               }
               // include: path.resolve(__dirname, 'src')
            ]
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            use: 'url-loader'
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf|ico)$/,
            use: 'file-loader'
         }
      ]
   },
   //插件配置
   plugins: [
      //HTML 模版导入
      new HtmlWebpackPlugin({
         title: '水镜系统',
         template: path.resolve(__dirname, './public/index.html'),
         favicon: './public/favicon.ico' // 添加小图标
      }),
      //每次打包 清除 dist 目录 生成新的
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: [ '!static','js','styles','index.html' ]
      }),
      //css less 抽离
      new MiniCssExtractPlugin({
         filename: 'styles/[name].[hash:4].css',
         chunkFilename:'styles/[name].[hash:4].css'
      }),
      // 多线程打包
      new HappyPack({
         // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
         id: 'babel',
         // 如何处理 .js 文件，用法和 Loader 配置中一样
         loaders: [ 'babel-loader?cacheDirectory=true' ],
         //使用共享进程池中的自进程去处理任务
         threadPool: happyThreadPool,
         //是否允许happypack输出日志，默认true
         verbose: false
      }),
      // 全局环境变量
      new webpack.DefinePlugin({
         'process.env': {
            PROCESS_ENV: JSON.stringify(process.env.PROCESS_ENV)
         }
      }),
      // 链接-编译库(可连接多个)
      new webpack.DllReferencePlugin({
         context: __dirname,
         manifest: require('./dist/static/react.manifest.json')
      })
   ],
   // 设置别名
   resolve: {
      // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      modules: [ path.resolve(__dirname, 'src'), path.resolve('node_modules') ],
      alias: {
         '@': path.resolve(__dirname, 'src'),
         'assets': path.resolve(__dirname, 'src/assets/'),
         'components': path.resolve(__dirname, 'src/components/'),
         'pages': path.resolve(__dirname, 'src/pages/'),
         'state': path.resolve(__dirname, 'src/store/state/index')
      },
      enforceExtension: false,
      extensions: [ '.js', '.jsx', '.json', '.css', '.less' ]
   }
};
