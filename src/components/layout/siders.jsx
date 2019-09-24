import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;
import RouterConfig from '@/routers/routerConfig';
class Siders extends Component {
   constructor (props) {
      super(props);
      this.state = {
         routerConfig: JSON.parse(JSON.stringify(RouterConfig)),
         // sider配置
         siderData: {
            className: 'cy-layout-sider',
            width: '200'
         },
         // 菜单
         menuData: {
            mode: 'inline'
         }
      };
   }
   // 递归循环添加子菜单
   recursionMenu (data) {
      return data.map(items => {
         if (items.children && items.children.length > 0) {
            return (
               <SubMenu
                  key = { items.key }
                  title = {
                     <span>
                        { items.icon ? <Icon type = { items.icon } /> : '' }
                        <span>{ items.title }</span>
                     </span>
                  }
               >
                  { this.recursionMenu(items.children) }
               </SubMenu>
            );
         }
         return (
            <MenuItem key = { items.key }>
               { items.icon ? <Icon type = { items.icon } /> : '' }
               <span> { items.title }</span>
            </MenuItem>
         );
      });
   }
   render () {
      let { siderData, menuData, routerConfig } = this.state;
      let {
         collapsed,
         siderMenu,
         siderSubMenu,
         openKeys,
         selectedKeys,
         siderMenuOnSelect
      } = this.props;
      return (
         <Sider { ...siderData } collapsed = { collapsed }>
            <div className = 'layout-logo-content'>
               <img
                  src = { require('../../assets/images/cylogo.png') }
                  alt = ''
                  className = 'layout-logo'
               />
            </div>
            <Menu
               { ...menuData }
               openKeys = { openKeys }
               selectedKeys = { selectedKeys }
               onOpenChange = { siderMenu }
               onClick = { siderSubMenu }
               onSelect = { siderMenuOnSelect }
            >
               { this.recursionMenu(routerConfig) }
            </Menu>
         </Sider>
      );
   }
}
export default Siders;
