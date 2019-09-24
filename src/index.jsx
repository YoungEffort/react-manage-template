/*
   index.js 入口配置文件
   秦国胜
   2019-08-05
*/

// 处理ie兼容
window.Promise = Promise;
window.Set = Set;
window.Map = Map;
// 入口配置文件
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index'; // 状态管理数据
import Routers from './routers/index'; // 路由
import { ConfigProvider } from 'antd'; // UI组件国际化
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './assets/less/global.less'; //全局公共样式
//状态数据持久化 会存储在 localStorage 中
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import { Loading } from './components/index';
const persistor = persistStore(store);
// 渲染路由

render(
   <Provider store = { store }>
      <PersistGate loading = { <Loading /> } persistor = { persistor }>
         <ConfigProvider locale = { zh_CN }>
            <Router>
               <Routers />
            </Router>
         </ConfigProvider>
      </PersistGate>
   </Provider>,
   document.getElementById('root')
);
