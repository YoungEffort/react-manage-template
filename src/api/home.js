import axios from '@/utils/http.js';

// 查询列表数据
export const getHomeList = params => {
   return axios.request({
      url: '/api/get/home/homeList',
      method: 'get',
      params
   });
};