/*
   首页 Home
   秦国胜
   2019-08-05
*/
import React, { Component } from 'react';
// import config from '@/config/config'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newHome } from '@/store/actions/index';
import { Button } from 'antd';

class Home extends Component {
   componentDidMount () {
      //  console.log('环境配置数据',config[process.env.PROCESS_ENV])
   }

  // 点击同步更改状态管理内的数据
  newText = () => {
     this.props.newHome({
        text: '我的文本改变了,我是同步数据'
     });
  };
  // 点击异步更改状态管理内的数据
  ansyncText = () => {
     this.props.asyncHome();
  };

  render () {
     return (
        <div>
           <div>这里是首页</div>
           <div>我是状态管理内的文本：{ this.props.home.text }</div>
           <div>
              <Button onClick = { this.newText }>点我同步改变</Button>
           </div>
           <div>
              <Button onClick = { this.ansyncText }>点我异步改变</Button>
           </div>
           <ul>
              { this.props.home.lists.map(itme => {
                 return <li key = { itme.id }>{ itme.name }</li>;
              }) }
           </ul>
        </div>
     );
  }
}
// 读取数据 映射状态管理的数据 其实也就是把Redux中的数据映射到React中的props中去。
function mapStateToProps (state) {
   return {
      home: state.Home
   };
}
// 设置数据 把各种dispatch也变成了props让你可以直接使用
function mapDispatchToProps (dispatch) {
   return {
      newHome: bindActionCreators(newHome, dispatch),
      // 处理异步
      asyncHome: () => {
         dispatch({
            type: 'ASYNCHOME'
         });
      }
   };
}
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Home);
