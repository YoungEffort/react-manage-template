import { put } from 'redux-saga/effects';
import { asyncHome } from '@/store/actions/index';

export function* getInitList () {
   // yield console.log('你好saga')
   const action = asyncHome({
      text: '你好saga,我是异步数据'
   });
   // //put相当于dispatch这个新的action
   yield put(action);
}
