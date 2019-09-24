/*
   定义homeActions
   秦国胜
   2018-08-12
*/
import { HOME, NEWHOME } from './actionTypes';
// 同步的
export function newHome (data) {
   return {
      type: HOME,
      data
   };
}

// 异步的
export function asyncHome (data) {
   return {
      type: NEWHOME,
      data
   };
}
