import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
class Contents extends Component {
   render () {
      return <Content>{ this.props.children }</Content>;
   }
}

export default Contents;
