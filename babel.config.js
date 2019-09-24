/*
   bable配置
   秦国胜
   2019-08-05
*/
module.exports = function (api) {
   api.cache(true);
   const presets = [
      [ '@babel/preset-env', {
         'targets': {
            'browsers': [ '> 1%', 'last 2 versions', 'not ie <= 11' ]
         },
         'useBuiltIns': 'usage',
         'corejs': 2,
         'debug': true
      } ], 
      '@babel/preset-react'
   ];
   const plugins = [
      '@babel/plugin-syntax-dynamic-import',
      [ '@babel/plugin-proposal-class-properties', { 'loose': true } ],                                     //class 类
      [ 'import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' } ]                     //按需加载antd的 样式
   ];
   return {
      presets,
      plugins
   };
};
