// 一级菜单---任务管理
import Loadable from '@/utils/loadable'; // 按需加载 组件
export default  {
   icon: 'database',
   title: '任务管理',
   name: 'taskManage',
   children: [
      {
         title: '任务看板',
         name: 'techBoard',
         path: '/taskManage/taskBoard',
         component: Loadable(() => import('@/pages/taskManage/taskBoard'))
      },
      {
         title: '任务编辑',
         name: 'taskEdit',
         path: '/taskManage/taskEdit',
         component: Loadable(() => import('@/pages/taskManage/taskEdit'))
      }
   ]
}