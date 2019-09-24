import axios from '@/utils/http.js';
// import { BXFQ } from '@/api/server'

// 登录
export const loginPost = params => {
   return axios.request({
      url: '/api/user/login',
      method: 'post',
      data: params
   });
};
// 注册
export const registerPost = params => {
   return axios.request({
      url: '/api/user/register',
      method: 'post',
      data: params
   });
};
// 忘记密码
export const forgetPassPost = params => {
   return axios.request({
      url: '/api/user/forget',
      method: 'post',
      data: params
   });
};
