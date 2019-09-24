/*
   按需加载
   秦国胜
   2019-08-14
*/

import Loadable from 'react-loadable';
import { Loading } from '@/components/index';
export default (loader, loading = Loading) => {
   return Loadable({
      loader,
      loading
   });
};
