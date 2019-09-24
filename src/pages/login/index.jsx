/*
   登录
*/
import React, { Component } from 'react';
import { message } from 'antd';
import './style.less';
import { loginPost, registerPost, forgetPassPost } from '@/api/login.js';
import Login from './login';
import Register from './register';
import ForgetPass from './forgetPass';
import { clearTrim } from '../../utils/reg';
class LoginRegister extends Component {
   constructor (props) {
      super(props);
      this.state = {
      // 判断当前是登录还是注册 0 登录 1 注册
         isShow: 0
      };
   }
  // 登录注册忘记密码组件切换
  goLoginRegister = type => {
     // 0 登录 1 注册 2 忘记密码
     let { isShow } = this.state;
     isShow = type;
     this.setState({
        isShow
     });
  };
  // 公共提交
  commonSubmit = (e, form) => {
     let { isShow } = this.state;
     e.preventDefault();
     form.validateFields((err, values) => {
        if (!err) {
           values = clearTrim(values);
           switch (isShow) {
           case 1:
              this.postRegister(values);
              break;
           case 2:
              this.postForgetPass(values);
              break;
           default:
              this.postLogin(values);
              break;
           }
        }
     });
  };
  // 回车登录Submit
  enterKeySubmit = (e, from) => {
     if (e.nativeEvent.keyCode === 13) {
        // e.nativeEvent获取原生的事件对像
        this.commonSubmit(e, from);
     }
  };
  // 发起登录请求
  postLogin = loginData => {
     loginPost({
        ...loginData
     }).then(res => {
        if (parseFloat(res.code) === 200) {
           sessionStorage.user_info = JSON.stringify({
              access_token: res.data
           });
           message.success('登录成功');
           this.props.history.push({ pathname: '/home' });
        }
     });
  };
  // 注册提交请求
  postRegister = registerData => {
     let newValues = JSON.parse(JSON.stringify(registerData));
     delete newValues.newPassword;
     registerPost({
        ...newValues
     })
        .then(res => {
           if (parseFloat(res.code) === 200) {
              message.success('注册成功');
              this.goLoginRegister(0);
           }
        })
        .carch(err => {
           console.log(err);
        });
  };
  // 忘记密码提交
  postForgetPass = forgetPassData => {
     forgetPassPost({
        ...forgetPassData
     })
        .then(res => {
           if (parseFloat(res.code) === 200) {
              message.success('密码修改成功');
              this.goLoginRegister(0);
           }
        })
        .carch(err => {
           console.log(err);
        });
  };
  //  页面展示
  viewsCompont = () => {
     let { isShow } = this.state;
     switch (isShow) {
     case 1:
        return (
          <>
            <h3 className = 'login-form-title'>
               <span>注&nbsp;&nbsp;册</span>
            </h3>
            <Register
               enterKeySubmit = { this.enterKeySubmit }
               commonSubmit = { this.commonSubmit }
            />
          </>
        );
     case 2:
        return (
          <>
            <h3 className = 'login-form-title'>
               <span>忘记密码</span>
            </h3>
            <ForgetPass
               enterKeySubmit = { this.enterKeySubmit }
               commonSubmit = { this.commonSubmit }
            />
          </>
        );
     default:
        return (
          <>
            <h3 className = 'login-form-title'>
               <span>登&nbsp;&nbsp;录</span>
            </h3>
            <Login
               enterKeySubmit = { this.enterKeySubmit }
               commonSubmit = { this.commonSubmit }
            />
          </>
        );
     }
  };
  render () {
     let { isShow } = this.state;
     return (
        <div className = 'cy-login'>
           <div
              className = {
                 isShow === 1
                    ? 'login-form login-form-w2'
                    : 'login-form login-form-w1'
              }
           >
              { this.viewsCompont() }
              <div className = 'f-c login-operating-btn'>
                 { isShow === 0 || isShow === 1 ? (
              <>
                { isShow === 0 ? (
                   <div
                      className = 'f-l operating-btn'
                      onClick = { () => this.goLoginRegister(1) }
                   >
                    注册
                   </div>
                ) : (
                   <div
                      className = 'f-l operating-btn'
                      onClick = { () => this.goLoginRegister(0) }
                   >
                    登录
                   </div>
                ) }
                <div
                   className = 'f-r operating-btn'
                   onClick = { () => this.goLoginRegister(2) }
                >
                  忘记密码？
                </div>
              </>
                 ) : (
              <>
                <div
                   className = 'f-l operating-btn'
                   onClick = { () => this.goLoginRegister(0) }
                >
                  登录
                </div>
                <div
                   className = 'f-r operating-btn'
                   onClick = { () => this.goLoginRegister(1) }
                >
                  注册
                </div>
              </>
                 ) }
              </div>
           </div>
        </div>
     );
  }
}

export default LoginRegister;
