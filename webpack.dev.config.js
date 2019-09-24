/*
   webpack.dev.config.js 开发环境配置
   秦国胜
   2019-08-05
*/

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
// 打包日志
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports=merge(
   baseWebpackConfig,
   {
      mode: 'development',
      devtool:'cheap-module-eval-source-map',
      module:{
         rules:[
            {
               test: /\.(js|jsx)$/,
               use:[
                  { loader:'eslint-loader' }
               ],
               enforce: 'pre', // 编译前检查
               exclude: /node_modules/, // 不检测的文件
               include: [ path.resolve(__dirname, 'src') ] // 指定检查的目录
            }
         ]
      },
      plugins:[
         //模块热替换
         new webpack.NamedModulesPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         // 打包日志优化
         new FriendlyErrorsWebpackPlugin({
            // 运行成功
            compilationSuccessInfo: {
               message: 'http://localhost:9999/',
               notes: [ 'http://localhost:9999/' ]
            }
         }) 
      ],
      //本地服务器配置
      devServer: {
         contentBase: './dist',
         host: '0.0.0.0',
         port: 9999,
         historyApiFallback: true,
         overlay: {
            errors: false//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
         },
         quiet: false, // 控制台不输出打包信息
         inline: true, // 使用inline的方式进行页面自动刷新
         open: false, // 不自动打开浏览器
         hot: true,
         progress: false,
         clientLogLevel: 'none',  // 不在浏览器控制台输出错误
         // 代理
         proxy: {
            '/api/*': {
               target: 'http://172.17.203.139:3000/'
            }
         }
      }
   }
);
