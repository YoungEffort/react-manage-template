/*
   代码规范
   秦国胜
   2019-08-05
*/
  // "husky": {
  //   "hooks": {
  //     "pre-commit": "npm run lint-staged"
  //   }
  // },
  // "lint-staged": {
  //   "src/**/*.js": "eslint --ext .js",
  //   "src/**/*.jsx": "eslint --ext .jsx"
  // },
module.exports = {
   root: true,
   extends: ["eslint:recommended","plugin:react/recommended"],
   parser: "babel-eslint",
//    plugins: [
//       "prettier"
//   ],
   env: {
      browser: true, // 开发环境配置表示可以使用浏览器的方法
      node: true, //
      es6: true
   },
   parserOptions: {
      ecmaFeatures: {
         "jsx": true
       },
      sourceType: 'module' // 按照模块的方式解析
   },
   settings: {
      "react": {
         "createClass": "createReactClass",
         "pragma": "React",
         "version": "detect",
         "flowVersion": "0.53" // Flow version
      },
      "propWrapperFunctions": [

      ],
      "linkComponents": [
         "Hyperlink",
         {"name": "Link", "linkAttribute": "to"}
      ]
   },
   rules: {
     // "prettier/prettier": "error",
    // 自定义的规则 warn error
      "indent": ['error', 3],                                           // 强制使用一致的缩进
      'space-before-function-paren': 1,                                 // 在函数左括号的前面是否有空格
      'eol-last': 0,                                                    // 不检测新文件末尾是否有空行
      // 'semi': ["error","always", { "omitLastInOneLineBlock": true }],   // 不检测新文件末尾是否有空行
      'semi': 0,   // 不检测新文件末尾是否有空行
      'no-extra-semi': 2,                                               // 分号always / 忽略分号 any / never 禁止分号
      "quotes": ["error", "single"],                                    // 字符串没有使用单引号
      "jsx-quotes": ["error", "prefer-single"],                         // 强制在 JSX 属性中一致地使用双引号或单引号
      "no-console": ["error",{allow:["log","warn"]}],                   // 允许使用console.log()
      "no-cond-assign":1,                                               // 禁止条件表达式中出现赋值操作
      "no-new":0,                                                       // 允许使用 new 关键字
      "no-constant-condition": 2,                                       // 禁止在条件中使用常量表达式
      "no-dupe-args": 2,                                                // 禁止 function 定义中出现重名参数
      "no-dupe-keys": 2,                                                // 禁止对象字面量中出现重复的 key
      "no-duplicate-case": 2,                                           // 禁止出现重复的 case 标签
      "no-empty": ["error", { "allowEmptyCatch": true }],               // 禁止出现空语句块
      "no-func-assign": 2,                                              // 禁止对 function 声明重新赋值
      "no-inner-declarations": 2,                                       // 禁止在嵌套的块中出现变量声明或 function 声明
      "no-unreachable": 2,                                              // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
      "default-case": 2,                                                // 要求 switch 语句中有 default 分支
      "no-empty-function": 2,                                           // 禁止出现空函数
      "no-empty-pattern": 2,                                            // 禁止使用空解构模式
      "no-fallthrough": 2,                                              // 禁止 case 语句落空
      "no-global-assign": 2,                                            // 禁止对原生对象或只读的全局对象进行赋值
      "no-loop-func": 2,                                                // 禁止在循环中出现 function 声明和表达式
      "no-return-assign": 2,                                            // 禁止在 return 语句中使用赋值语句
      "no-undef": 2,                                                    // 禁用未声明的变量
      "no-unused-vars": 2,                                              // 禁止出现未使用过的变量
      "no-use-before-define": 2,                                        // 禁止在变量定义之前使用它们
      "array-bracket-spacing": ["error", "always"],                     // 强制数组方括号中使用一致的空格
      "brace-style": 2,                                                 // 强制在代码块中使用一致的大括号风格
      "comma-dangle":2,                                                 // 强制使用一致的逗号风格
      "object-curly-spacing": ["error", "always"],                      // 强制大括号内换行符的一致性
      /*
             *********** ECMAScript 6 ***********
      */
      "arrow-spacing": 2,                                               // 强制箭头函数的箭头前后使用一致的空格
      "no-duplicate-imports": 2,                                        // 禁止重复模块导入
      "no-useless-rename": 2,                                           // 禁止重复模块导入
      "no-var": 2,                                                      // 要求使用 let 或 const 而不是 var
      "no-delete-var": 2,                                               // 不能对var声明的变量使用delete操作符
      "no-extra-boolean-cast": 0,                                       // 禁止不必要的bool转换  
      /*
             *********** react ***********
      */
      "react/default-props-match-prop-types": 2,                        // 防止组件上的无关defaultProps
      "react/forbid-prop-types": 0,                                     // 禁止某些propTypes
      "react/no-access-state-in-setstate": 2,                           // 阻止在this.setState中使用this.state
      "react/display-name": 2,                                          // 组件定义时需要定义组件名称
      // "react/no-unused-state:": 2,                                   // 禁止定义未使用的state属性
      "react/jsx-equals-spacing": ["error", "always"],                  // 等号两边是否留空格
      "react/jsx-tag-spacing": 2,                                       // 验证标签周围的空格
      "react/jsx-boolean-value": 2,                                     // 在JSX中强制布尔属性符号
      "react/jsx-closing-bracket-location": 1,                          // 在JSX中验证右括号位置
      "react/jsx-curly-spacing": [2, {"when": "always", "children": true}],// 在JSX属性和表达式中加强或禁止大括号内的空格。
      "react/jsx-indent-props": [2, 3],                                 // 验证JSX中的props缩进
      "react/jsx-key": 2,                                               // 在数组或迭代器中验证JSX具有key属性
      "react/jsx-max-props-per-line": [1, {"maximum": 3}],              // 限制JSX中单行上的props的最大数量
      "react/jsx-no-duplicate-props": 2,                                // 防止在JSX中重复的props
      "react/jsx-no-literals": 0,                                       // 防止使用未包装的JSX字符串
      "react/jsx-no-undef": 1,                                          // 在JSX中禁止未声明的变量
      "react/jsx-pascal-case": 0,                                       // 为用户定义的JSX组件强制使用PascalCase 大驼峰命名
      "react/jsx-uses-react": 1,                                        // 防止反应被错误地标记为未使用
      "react/jsx-uses-vars": 2,                                         // 防止在JSX中使用的变量被错误地标记为未使用
      "react/no-danger": 0,                                             // 防止使用危险的JSX属性
      "react/no-did-mount-set-state": 0,                                // 防止在componentDidMount中使用setState
      "react/no-did-update-set-state": 0,                               // 防止在componentDidUpdate中使用setState
      "react/no-direct-mutation-state": 2,                              // 防止this.state的直接变异
      "react/no-multi-comp": 0,                                         // 防止每个文件有多个组件定义
      "react/no-unknown-property": 2,                                   // 防止使用未知的DOM属性
      "react/prefer-es6-class": 2,                                      // 为React组件强制执行ES5或ES6类
      "react/prop-types": 0,                                            // 防止在React组件定义中丢失props验证 props定义关闭
      "react/react-in-jsx-scope": 2,                                    // 使用JSX时防止丢失React
      "react/self-closing-comp": 1,                                     // 防止没有children的组件的额外结束标签
      "react/no-array-index-key": 0,                                    // 防止在数组中遍历中使用数组key做索引
      "react/no-deprecated": 1,                                          // 不使用弃用的方法
      "react/no-string-refs": 2                                          // 不使用弃用的方法
    },
    // 全局变量配置
   globals:{
        "window": true,
        "document": true,
        "module": true,
        "require": true,
        "localStorage": true,
   }
};
