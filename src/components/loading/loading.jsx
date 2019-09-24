/*
   loading组件
   秦国胜
   2019-08-05
*/

import React, { Component } from 'react';
import { Spin } from 'antd';
import './loading.less';

class Loading extends Component {
   render () {
      return (
         <div className = 'loading'>
            <div className = 'loading-content'>
               <div className = 'loading-spin'>
                  <Spin tip = '加载中...' size = 'large' />
               </div>
            </div>
         </div>
      );
   }
}

export default Loading;
