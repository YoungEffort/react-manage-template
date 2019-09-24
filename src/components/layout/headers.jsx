import React, { Component } from 'react';
import { Layout, Icon, Breadcrumb, Tooltip, Dropdown, Menu, Tabs } from 'antd';
const { Header } = Layout;
const { TabPane } = Tabs;
class Headers extends Component {
   constructor (porps) {
      super(porps);
      this.state = {
         isFullScreen: true,
         fullScreenText: '全屏',
         fullScreenIcon: 'fullscreen',
         // tap 数据
         activeKey: '1'
      };
   }
   componentDidMount () {
      this.monitorKeydown();
      this.watchFullScreen();
   }
   // 监听键盘全屏
   monitorKeydown () {
      // let wid = document.body.clientWidth
      // console.log(wid)
      // window.onresize = () => {
      // }
   }
  // 全屏切换
  fullScreen = () => {
     if (this.state.isFullScreen) {
        this.requestFullScreen();
        this.setState({
           isFullScreen: false,
           fullScreenText: '退出全屏',
           fullScreenIcon: 'fullscreen-exit'
        });
     } else {
        this.exitFullscreen();
        this.setState({
           isFullScreen: true,
           fullScreenText: ' 全屏',
           fullScreenIcon: 'fullscreen'
        });
     }
  };
  //进入全屏
  requestFullScreen = () => {
     let de = document.documentElement || document.body;
     if (de.requestFullscreen) {
        de.requestFullscreen();
     } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
     } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
     } else if (de.msRequestFullscreen) {
        de.msRequestFullscreen();
     }
  };
  // 退出全屏
  exitFullscreen = () => {
     let de = document;
     if (de.exitFullscreen) {
        de.exitFullscreen();
     } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
     } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
     } else if (document.msExitFullscreen) {
        de.msExitFullscreen();
     }
  };
  watchFullScreen = () => {
     const _self = this;
     document.addEventListener(
        'webkitfullscreenchange',
        function () {
           _self.setState({
              isFullScreen: document.webkitIsFullScreen
           });
        },
        false
     );
  };
  render () {
     let { fullScreenText, fullScreenIcon } = this.state;
     let {
        tapData,
        tapActiveKey,
        tapOnChange,
        tapOnEdit,
        breadcrumbData,
        isShowSiders,
        passModalHideShow,
        quitLogin
     } = this.props;
     const menu = (
        <Menu>
           <Menu.Item>
              <div onClick = { passModalHideShow }>修改密码</div>
           </Menu.Item>
           <Menu.Item>
              <div onClick = { quitLogin }>退出登录</div>
           </Menu.Item>
        </Menu>
     );
     return (
        <Header className = 'cy-layout-header'>
           <div className = 'cy-layout-header-top'>
              <div className = 'cy-header-menu' onClick = { isShowSiders }>
                 <Icon type = 'menu' className = 'cy-header-icon' />
              </div>
              <div className = 'cy-header-content f-c'>
                 <div className = 'f-l'>
                    <span className = ''>
                       <Icon type = 'home' />
                首页
                    </span>
                    <Breadcrumb className = 'cy-breadcrumb'>
                       { breadcrumbData.map(item => {
                          if (parseFloat(item.key) === 0) {
                             return (
                                <Breadcrumb.Item key = { item.key }>
                        /&nbsp;&nbsp;{ item.title }
                                </Breadcrumb.Item>
                             );
                          } else {
                             return (
                                <Breadcrumb.Item key = { item.key }>
                                   { item.title }
                                </Breadcrumb.Item>
                             );
                          }
                       }) }
                    </Breadcrumb>
                 </div>
                 <div className = 'f-r cy-header-r'>
                    <div className = 'fullscreen'>
                       <Tooltip placement = 'bottom' title = { fullScreenText }>
                          <Icon
                             type = { fullScreenIcon }
                             className = 'header-fullscreen'
                             onClick = { this.fullScreen }
                          />
                       </Tooltip>
                    </div>
                    <div className = 'fullscreen header-user-container'>
                       <Dropdown overlay = { menu } placement = 'bottomCenter'>
                          <div className = 'header-user-content'>
                             <span className = 'header-user' />
                             <Icon type = 'caret-down' />
                          </div>
                       </Dropdown>
                    </div>
                 </div>
              </div>
           </div>
           <div>
              <Tabs
                 hideAdd
                 onChange = { tapOnChange }
                 activeKey = { tapActiveKey }
                 type = 'editable-card'
                 onEdit = { tapOnEdit }
              >
                 { tapData &&
              tapData.map(pane => (
                 <TabPane
                    tab = { pane.title }
                    key = { pane.key }
                    closable = { pane.closable }
                 />
              )) }
              </Tabs>
           </div>
        </Header>
     );
  }
}
export default Headers;
