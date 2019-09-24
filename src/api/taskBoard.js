//任务看板
import axios from '@/utils/http.js';
// 列表
export const querylist = params => {
   return axios.request({
      url: '/api/get/project/querylistpro',
      method: 'get',
      params: params
   });
};