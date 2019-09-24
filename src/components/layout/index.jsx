/*
   布局组件
   秦国胜
   2019-08-12
*/
import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { Layout, message, Modal } from 'antd';
import Siders from './siders';
import Headers from './headers';
import Contents from './contens';
import { forgetPassPost } from '@/api/login.js';
import './style.less';
import RouterConfig from '@/routers/routerConfig';
import PassMoadl from './compont/passModal';
class Layouts extends Component {
   constructor (props) {
      super(props);
      this.state = {
      // siders 菜单的关闭和隐藏
         collapsed: false,
         // 路由
         routerConfig: JSON.parse(JSON.stringify(RouterConfig)),
         // 菜单选中
         selectedKeys: [ '0' ],
         // 菜单展开
         openKeys: [],
         // tap'
         tapData: [ { key: '0', title: '首页', path: '/home', closable: false } ],
         tapActiveKey: '0',
         // 面包屑
         breadcrumbData: [],
         // 页面title
         pageTitle: '首页',
         isClickMenu: false,
         // 修改密码弹窗
         passMoadlVisible: false
      };
   }
   componentDidMount () {
      let route = this.props.history.location.pathname;
      this.queryRouter(route);
   }
   shouldComponentUpdate () {
      return true;
   }
   componentWillReceiveProps () {
      // 判断路由 是从地址栏进入 还是回退 或前进 显示对应菜单和面包屑
      !this.state.isClickMenu
         ? this.queryRouter(this.props.history.location.pathname)
         : this.setState({
            isClickMenu: false
         });
   }
  // 根据路由显示对应菜单信息
  queryRouter = route => {
     let { routerConfig } = this.state;
     let query = (routeData, route) => {
        let len = routeData.length;
        for (let i = 0; i < len; i++) {
           let item = routeData[i];
           if (item.path === route) {
              this.calculateTabData(item);
              let selets = [];
              selets = this.tapClickMenu(item.key);
              document.title = item.title;
              item.key !== '0'
                 ? this.queryBreadcrumb(item.key)
                 : this.setState({ breadcrumbData: [] });
              this.setState({
                 selectedKeys: [ item.key ],
                 openKeys: selets
              });
              break;
           } else {
              if (item.children && item.children.length > 0) {
                 query(item.children, route);
              }
           }
        }
     };
     query(routerConfig, route);
  };
  // 计算渲染tab
  calculateTabData = route => {
     let { tapData } = this.state;
     let menuData = JSON.parse(window.sessionStorage.getItem('menuData'));
     let newTapData = [];
     let onOff = true;
     menuData ? (newTapData = menuData.tapData) : (newTapData = tapData);
     for (let i = 0; i < newTapData.length; i++) {
        let item = newTapData[i];
        if (route.key === item.key) {
           onOff = false;
           break;
        }
        onOff = true;
     }
     if (onOff) {
        newTapData.push({
           key: route.key,
           title: route.title,
           path: route.path
        });
     }
     this.setState(
        {
           tapData: newTapData,
           tapActiveKey: route.key
        },
        () => {
           this.saveMenuData();
        }
     );
  };
  // 控制 siders 菜单的关闭和隐藏
  isShowSiders = () => {
     let { collapsed, openKeys } = this.state;
     if (collapsed) {
        collapsed = false;
     } else {
        collapsed = true;
        openKeys = [];
     }
     this.setState({
        collapsed,
        openKeys
     });
  };
  // 左侧菜单点击 SubMenu
  siderMenu = openKeys => {
     // 选中的菜单
     let selets = [];
     if (openKeys && openKeys.length > 0) {
        for (let i = 0; i < openKeys[openKeys.length - 1].length + 1; i++) {
           if (i % 2 === 1) {
              selets.push(openKeys[openKeys.length - 1].slice(0, i));
           }
        }
     }

     this.setState({
        openKeys: selets
     });
  };
  // 菜单被选中时的回调
  siderMenuOnSelect = ({ key }) => {
     this.setState({
        selectedKeys: [ key ]
     });
  };
  // 点击子菜单 跳转路由
  siderSubMenu = ({ key }) => {
     let { routerConfig } = this.state;
     if (key === '0') {
        this.setState({
           openKeys: []
        });
     }
     this.queryPath(routerConfig, key);
     key !== '0'
        ? this.queryBreadcrumb(key)
        : this.setState({ breadcrumbData: [] });
  };
  // 递归查找跳转路由
  queryPath (routers, key) {
     for (let i = 0; i < routers.length; i++) {
        let items = routers[i];
        if (!items.children && items.key === key) {
           this.addTap(items);
           this.setState(
              {
                 selectedKeys: [ key ],
                 pageTitle: items.title
              },
              () => {
                 this.saveMenuData();
              }
           );
           document.title = items.title;
           this.setState(
              {
                 isClickMenu: true
              },
              () => {
                 this.props.history.push({ pathname: items.path });
              }
           );
           break;
        } else if (items.children && items.children.length > 0) {
           this.queryPath(items.children, key);
        }
     }
  }
  // 添加tap
  addTap = activeItem => {
     let { tapData } = this.state;
     let newTapData = JSON.parse(JSON.stringify(tapData));
     let onOff = true;
     for (let i = 0; i < newTapData.length; i++) {
        let item = newTapData[i];
        if (activeItem.key === item.key) {
           onOff = false;
           this.setState({
              tapActiveKey: activeItem.key
           });
           break;
        }
        onOff = true;
     }
     if (!onOff) return;
     newTapData.push({
        key: activeItem.key,
        title: activeItem.title,
        path: activeItem.path
     });
     this.setState({
        tapActiveKey: activeItem.key,
        tapData: newTapData
     });
  };
  // 右侧tap栏 选中
  tapOnChange = activeKey => {
     let { routerConfig } = this.state;
     let selets = [];
     this.queryPath(routerConfig, activeKey);
     selets = this.tapClickMenu(activeKey);
     this.setState({
        selectedKeys: [ activeKey ],
        tapActiveKey: activeKey,
        openKeys: selets
     });
     activeKey !== '0'
        ? this.queryBreadcrumb(activeKey)
        : this.setState({ breadcrumbData: [] });
  };
  // tap选中 关闭时
  tapOnEdit = (targetKey, action) => {
     if (action === 'remove') {
        this.tapRemove(targetKey);
     }
  };
  // tap关闭
  tapRemove = targetKey => {
     let { tapActiveKey, tapData } = this.state;
     let newTabData = JSON.parse(JSON.stringify(tapData));
     let activeIndex = 0; // 当前的下标
     let newTapActiveKey = tapActiveKey; // 当删除的是选中的tap时
     let selets = [];
     newTabData.forEach((item, index) => {
        if (item.key === targetKey) {
           newTabData.splice(index, 1);
           activeIndex = index;
        }
     });
     // 选中key 相等时
     if (targetKey === tapActiveKey) {
        newTapActiveKey = tapData[activeIndex - 1].key;
        selets = this.tapClickMenu(tapData[activeIndex - 1].key);
        tapData[activeIndex - 1].key !== '0'
           ? this.queryBreadcrumb(tapData[activeIndex - 1].key)
           : this.setState({ breadcrumbData: [] });
        this.setState(
           {
              isClickMenu: true,
              selectedKeys: [ tapData[activeIndex - 1].key ],
              openKeys: selets
           },
           () => {
              this.props.history.push({ pathname: tapData[activeIndex - 1].path });
              this.saveMenuData();
           }
        );
     }
     this.setState(
        {
           tapActiveKey: newTapActiveKey,
           tapData: newTabData
        },
        () => {
           this.saveMenuData();
        }
     );
  };
  // tap 点击和关闭展开左侧菜单
  tapClickMenu = key => {
     let selects = [];
     for (let i = 0; i < key.length; i++) {
        if (i % 2 === 1) {
           selects.push(key.slice(0, i));
        }
     }
     return selects;
  };
  // 点击查找title 展示面包屑
  queryBreadcrumb = key => {
     let selects = [];
     for (let i = 0; i < key.length; i++) {
        if (i % 2 === 1) {
           selects.push(key.slice(0, i));
        }
     }
     selects.push(key);
     // 查找title
     this.queryMenutitle(selects);
  };
  // 递归查找菜单title
  queryMenutitle = selects => {
     let { routerConfig } = this.state;
     let menutitle = [];
     let queryTitle = (routers, selectKey) => {
        routers.forEach(x => {
           selectKey.forEach((y, index) => {
              if (x.key === y) {
                 menutitle.push({
                    key: index,
                    title: x.title
                 });
              } else {
                 if (x.children && x.children.length > 0) {
                    queryTitle(x.children, selectKey);
                 }
              }
           });
        });
     };
     queryTitle(routerConfig, selects);
     this.distinct(menutitle);
     this.setState(
        {
           breadcrumbData: menutitle
        },
        () => {
           this.saveMenuData();
        }
     );
  };
  // 去重排序
  distinct = arr => {
     for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
           if (arr[i].key == arr[j].key) {
              //第一个等同于第二个，splice方法删除第二个
              arr.splice(j, 1);
              j--;
           }
        }
     }
     arr.sort((a, b) => parseFloat(a.key) - parseFloat(b.key));
  };
  // 缓存菜单信息
  saveMenuData = () => {
     let {
        selectedKeys,
        openKeys,
        tapData,
        tapActiveKey,
        breadcrumbData,
        pageTitle
     } = this.state;
     let menuData = JSON.parse(window.sessionStorage.getItem('menuData'));
     menuData = {
        ...menuData,
        selectedKeys,
        openKeys,
        tapData,
        tapActiveKey,
        breadcrumbData,
        pageTitle
     };
     window.sessionStorage.setItem('menuData', JSON.stringify(menuData));
  };
  // 修改密码弹窗显示隐藏
  passModalHideShow = () => {
     let { passMoadlVisible } = this.state;
     passMoadlVisible ? (passMoadlVisible = false) : (passMoadlVisible = true);
     this.setState({
        passMoadlVisible
     });
  };
  // 修改密码 确认 发起请求
  changePassPost = (data, form) => {
     console.log(data, form);
     forgetPassPost({
        ...data
     })
        .then(res => {
           if (parseFloat(res.code) === 200) {
              form.resetFields();
              message.success('修改密码成功');
              this.passModalHideShow();
           }
        })
        .carch(err => {
           console.log(err);
        });
  };
  // 退出登录
  quitLogin = () => {
     let _this = this;
     Modal.confirm({
        title: '退出登录',
        content: '是否确认退出登录？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
           sessionStorage.removeItem('user_info');
           _this.props.history.push({ pathname: '/login' });
        }
     });
  };
  // 路由拦截 判断是否登录 页面跳转
  confirmToSave = () => {
     // location
     // let user_info = sessionStorage.user_info ?  JSON.parse(sessionStorage.user_info) : null
     // if (!user_info) {
     //    console.log (11111)
     //    return false
     // }
  };
  render () {
     let {
        openKeys,
        tapData,
        tapActiveKey,
        selectedKeys,
        breadcrumbData,
        collapsed,
        passMoadlVisible
     } = this.state;
     return (
        <div className = 'cy-layout'>
           <Prompt message = { this.confirmToSave } />
           <Layout className = 'cy-layout-main'>
              <Siders
                 openKeys = { openKeys }
                 selectedKeys = { selectedKeys }
                 siderMenu = { this.siderMenu }
                 siderSubMenu = { this.siderSubMenu }
                 siderMenuOnSelect = { this.siderMenuOnSelect }
                 collapsed = { collapsed }
              />
              <Layout>
                 <Headers
                    tapData = { tapData }
                    breadcrumbData = { breadcrumbData }
                    tapOnChange = { this.tapOnChange }
                    tapOnEdit = { this.tapOnEdit }
                    tapActiveKey = { tapActiveKey }
                    isShowSiders = { this.isShowSiders }
                    passModalHideShow = { this.passModalHideShow }
                    quitLogin = { this.quitLogin }
                 />
                 <Contents>
                    <div className = 'cy-layout-contents'>{ this.props.children }</div>
                 </Contents>
              </Layout>
           </Layout>
           <PassMoadl
              passMoadlVisible = { passMoadlVisible }
              passModalHideShow = { this.passModalHideShow }
              changePassPost = { this.changePassPost }
           />
        </div>
     );
  }
}

export default Layouts;
