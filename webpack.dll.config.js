/*
   webpack.dll.config 初始不需要重复加载的库
   秦国胜
   2019-08-05
*/
//抽离第三组件/库
const path = require('path');
const webpack = require('webpack');
//清除
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//打包进度条
const ProgressBarPlugin=require('progress-bar-webpack-plugin');
module.exports={
   entry: {
      react : [
         'react',
         'react-dom',
         'react-router-dom',
         'redux',
         'react-redux'
      ]
      //antdUi: ['antd'],
   },
   output: {
      // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
      filename: '[name].dll.js',
      path: path.resolve('dist/static'),
      // library必须和后面dllplugin中的name一致 后面会说明
      library: '[name]_dll_[hash]'
   },
   plugins: [
      new ProgressBarPlugin(),
      new CleanWebpackPlugin(),
      // 接入 DllPlugin
      new webpack.DllPlugin({
         // 动态链接库的全局变量名称，需要和 output.library 中保持一致
         // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
         name: '[name]_dll_[hash]',
         // 描述动态链接库的 manifest.json 文件输出时的文件名称
         path: path.join(__dirname, 'dist/static', '[name].manifest.json')
      })
   ]
};