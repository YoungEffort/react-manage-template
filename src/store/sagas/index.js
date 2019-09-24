/*
   redux 中间件 saga
   秦国胜
   2018-08-12
*/
import { takeEvery } from 'redux-saga/effects';
import { ASYNCHOME } from '@/store/actions/actionTypes';

import { getInitList } from './home';

//导出的mySaga需要写成一个Generator函数，异步处理函数getInitList也应是Generator函数
function* mySaga () {
   // 拦截ASYNCHOME这个action
   yield takeEvery(ASYNCHOME, getInitList);
}

export default mySaga;
