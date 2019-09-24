/*
   定义Home reducer
*/
import { HOME, NEWHOME } from '../actions/actionTypes';
import { homeData } from '../states/index';
const Home = function (state = homeData, action) {
   switch (action.type) {
   case HOME:
      return {
         ...state,
         ...action.data
      };
   case NEWHOME:
      return {
         ...state,
         ...action.data
      };
   default:
      return state;
   }
};

export default Home;
