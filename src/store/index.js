/*
   状态管理
   秦国胜
   2019-08-12
*/

// 仓库输出 整合 reducers // compose
import { createStore, applyMiddleware } from 'redux';

// 数据状态持久化
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// redux 中间件
import createSagaMiddleware from 'redux-saga';
import Sagas from '../store/sagas/index';

// 引入规则文件
import Reducers from './reducers/index.js';

//创建中间件
const sagaMiddleware = createSagaMiddleware();

// 需要缓存的状态
const persistConfig = {
   key: 'root',
   storage: storage,
   stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况,
   whitelist: [ '' ] // 指定需要缓冲的数据，不指定将缓存所有 [ 'Home' ]
   // blacklist: ['navigation']                // 指定不需要缓冲的数据，缓存黑名单
};

const myPersistReducer = persistReducer(persistConfig, Reducers);
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(myPersistReducer);

// const store = createStore(
//    myPersistReducer,
//    applyMiddleware(sagaMiddleware)
// )
sagaMiddleware.run(Sagas);

export default store;
