/*
 *  ajax 请求封装
 *  秦国胜
 *  2019/08/06
 */
import { notification } from 'antd';
import Axios from 'axios';
import { HashRouter } from 'react-router-dom';
import { getToken } from '@/utils/utils';
import config from '@/config/config';
import { isLocalDev } from '@/api/server';

const router = new HashRouter()

// 接口token 白名单
const whiteList = [ '/api/user/login', '/api/user/register', '/api/user/forget' ];
const isInWhiteList = function (url) {
   let flag = false;
   whiteList.forEach(function (e) {
      if (url.indexOf(e) >= 0) {
         flag = true;
      }
   });
   return flag;
};

// 超时时间
Axios.defaults.timeout = 30000;
// 请求地址
Axios.defaults.baseURL =
  isLocalDev === true ? '' : config[process.env.PROCESS_ENV].BASE_URL;

// 请求拦截
Axios.interceptors.request.use(
   config => {
      let access_token = getToken();
      if (access_token && !isInWhiteList(config.url)) {
         config.headers.Authorization = 'Bearer' + ' ' + getToken();
      }
      return config;
   },
   err => {
      return Promise.reject(err);
   }
);

// 响应拦截
Axios.interceptors.response.use(
   response => {
      if (response.status === 401) {
         window.sessionStorage.removeItem('user_info')
         router.history.push('/login')
      }
      let { data } = response;
      if (data.code == '200') {
         return data;
      } else {
         notification.error({
            message: data.code,
            description: data.msg,
            key: 0,
            duration: 3
         });
         return data;
      }
   },
   error => {
      if (error && error.response && error.response.status && error.response.status === 401) {
         notification.warning({
            message: '提示',
            description: '登录过期请重新登录',
            key: 0,
            duration: 3
         });
         window.sessionStorage.removeItem('user_info')
         router.history.push('/login')
      } else{
         notification.error({
            message: error.response.status,
            description: '网络繁忙，稍后重试',
            key: 0,
            duration: 3
         });
      }
   
      return Promise.reject(error);
   }
);

export default Axios;
