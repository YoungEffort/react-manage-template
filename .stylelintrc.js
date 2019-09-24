/*
   css,less规范
   秦国胜
   2019-08-28
*/
module.exports = {
   processors: [],
   plugins: [],
   extends: "stylelint-config-standard",                                      // 这是官方推荐的方式
   rules: {
      "unit-no-unknown": true,                                                // 禁止未知单位 
      "unit-whitelist": ["em", "rem", "%", "s", "px", "deg", "reg"],          // 单位白名单
      "at-rule-empty-line-before": "always",                                  // 样式空行
      "no-eol-whitespace": true,                                              // 禁止行尾空格
   }
}