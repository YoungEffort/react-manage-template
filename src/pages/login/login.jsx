import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
class LoginFrom extends Component {
   componentDidMount () {
      document.title = '登录';
   }
   render () {
      const { form, enterKeySubmit, commonSubmit } = this.props;
      const { getFieldDecorator } = form;
      return (
         <Form onSubmit = { e => commonSubmit(e, form) }>
            <FormItem>
               { getFieldDecorator('loginName', {
                  rules: [
                     { required: true, message: '请输入用户名!' },
                     { whitespace: true, message: '不能输入空格' }
                  ]
               })(
                  <Input
                     prefix = { <Icon type = 'user' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                     placeholder = '请输入用户名'
                  />
               ) }
            </FormItem>
            <FormItem>
               { getFieldDecorator('password', {
                  rules: [
                     { required: true, message: '请输入登录密码!' },
                     { whitespace: true, message: '不能输入空格' }
                  ]
               })(
                  <Input
                     prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                     type = 'password'
                     placeholder = '请输入登录密码'
                     onKeyPress = { e => enterKeySubmit(e, form) }
                  />
               ) }
            </FormItem>
            <FormItem className = 'form-submit'>
               <Button type = 'primary' htmlType = 'submit'>
            登&nbsp;&nbsp;&nbsp;录
               </Button>
            </FormItem>
         </Form>
      );
   }
}
const Login = Form.create({ name: 'login-from' })(LoginFrom);
export default Login;
