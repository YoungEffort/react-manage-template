/*
   错误边界处理
   秦国胜
   2019-06-08
*/

import React, { Component } from 'react';
import Err404 from '@/pages/404/404'; // 404
class ErrorBoundary extends Component {
   constructor (props) {
      super(props);
      this.state = { hasError: false };
   }

   // eslint-disable-next-line no-unused-vars
   static getDerivedStateFromError (error) {
      // 更新状态，以便下一个呈现将显示回退UI.
      return { hasError: true };
   }

   componentDidCatch (error, info) {
      // 您还可以将错误记录到错误报告服务中
      console.log(error, info);
   }

   render () {
      // 加载出错时显示的UI
      if (this.state.hasError) {
      // 您可以呈现任何自定义回退UI
         return <Err404 />;
      }

      return this.props.children;
   }
}
export default ErrorBoundary;
