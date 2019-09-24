/*
   错误页 404
   秦国胜
   2019-08-05
*/
import React, { Component } from 'react';
import './404.less';

class Err404 extends Component {
   componentDidMount () {
      document.title = '404';
   }
   render () {
      return (
         <div className = 'err-404'>
            <div className = 'err-text cl-2'>
               <span className = 'text'>4</span>
               <span className = 'text text-1'>0</span>
               <span className = 'text'>4</span>
            </div>
         </div>
      );
   }
}

export default Err404;
