/*
   路由配置 定义按需加载
   2019-06-08
*/

// 按需加载
// import Loadable from '@/utils/loadable' // 组件
import Home from '@/pages/home/index'
import taskManage from './taskManage' // 任务管理

const routerData = [
   {
      icon: 'home',
      title: '首页',
      path: '/home',
      component: Home,
      isType: true
   },
   taskManage
];

// 统一添加key 防止添加错误
let initMenuData = routerConfig => {
   let init = (routers, parentKey) => {
      routers.forEach((item, index) => {
         item.key = parentKey + index;
         if (item.children && item.children.length > 0) {
            init(item.children, item.key + '-');
         }
      });
   };
   init(routerConfig, '');
};
initMenuData(routerData);
export default routerData;
