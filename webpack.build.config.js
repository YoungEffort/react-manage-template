/*
   webpack.prod.config.js 生产环境配置
   秦国胜
   2019-08-05
*/
//const path = require('path');
const merge = require('webpack-merge');
//const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
//打包进度条
const ProgressBarPlugin=require('progress-bar-webpack-plugin');
//css 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports=merge(
   baseWebpackConfig,
   {
      mode: 'production',
      devtool:'cheap-module-source-map',
      plugins:[
         new ProgressBarPlugin(),
         // css 压缩
         new OptimizeCSSAssetsPlugin ({
            // 引入css 规则
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
               preset: [  'default', {
                  discardComments: { removeAll: true }, //对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
               } ]
            },
            canPrint: true  // 是否打印处理过程中的日志
         })
      ]
   }
);