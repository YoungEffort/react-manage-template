/*
   工具相关
*/
export const getToken = () => {
   const token =
    sessionStorage.user_info == undefined ||
    sessionStorage.user_info == 'undefined'
       ? ''
       : JSON.parse(sessionStorage.user_info).access_token;
   if (token) return token;
   else return false;
};
