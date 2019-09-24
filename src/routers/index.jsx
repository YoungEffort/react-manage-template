/*
   路由配置
   秦国胜
   2019-08-05
*/
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ErrorBoundary from './errorBoundary'; // 错误边界处理 加载失败时的显示
import RouterConfig from '@/routers/routerConfig';
import { Layout } from '@/components/index';
import Login from '@/pages/login/index'; // 登录组件单独处理
import ErrPage from '@/pages/404/404'; // 404 页面

class RouteApp extends Component {
   constructor (props) {
      super(props);
   }
   // 判断当前是否登录 跳转页面
   // 递归渲染路由
   routerViews (data) {
      let user_info = sessionStorage.user_info
         ? JSON.parse(sessionStorage.user_info)
         : null;
      return data.map(item => {
         if (item.children && item.children.length > 0) {
            return this.routerViews(item.children);
         }
         if (item.component) {
            return (
               <Route
                  key = { item.key }
                  path = { item.path }
                  exact
                  render = { props => {
                     return user_info ? (
                        <item.component { ...props } />
                     ) : (
                        <Redirect
                           to = { {
                              pathname: '/login',
                              state: { from: props.location }
                           } }
                        />
                     );
                  } }
               />
            );
         }
      });
   }
   render () {
      // 开发跳过拦截
      sessionStorage.user_info=JSON.stringify({})

      let user_info = sessionStorage.user_info
         ? JSON.parse(sessionStorage.user_info)
         : null;
      return (
         <ErrorBoundary>
            <Switch>
               <Route
                  path = '/'
                  exact
                  render = { props => {
                     return user_info ? (
                        <Redirect
                           to = { {
                              pathname: '/home',
                              state: { from: props.location }
                           } }
                        />
                     ) : (
                        <Login { ...props } />
                     );
                  } }
               />
               <Route
                  path = '/login'
                  exact
                  render = { props => {
                     return user_info ? (
                        <Redirect
                           to = { {
                              pathname: '/home',
                              state: { from: props.location }
                           } }
                        />
                     ) : (
                        <Login { ...props } />
                     );
                  } }
               />
               <Layout history = { this.props.history }>
                  <Switch>
                     { this.routerViews(RouterConfig) }
                     <Route exact component = { ErrPage } />
                  </Switch>
               </Layout>
               <Route exact component = { ErrPage } />
            </Switch>
         </ErrorBoundary>
      );
   }
}

export default withRouter(RouteApp);
