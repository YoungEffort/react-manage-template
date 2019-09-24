/*
   注册
   秦国胜
   2019-08-21
*/
import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { phone } from '@/utils/reg';
const FormItem = Form.Item;
class RegisterFrom extends Component {
   componentDidMount () {
      document.title = '注册';
   }
  // 验证两次密码
  validatorPass = (rule, value, callback) => {
     const { getFieldValue } = this.props.form;
     if (value && value !== getFieldValue('newPassword')) {
        callback('两次密码输入不一致！');
     }
     callback();
  };
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
              { getFieldDecorator('newPassword', {
                 rules: [
                    { required: true, message: '请输入密码!' },
                    { whitespace: true, message: '不能输入空格' }
                 ]
              })(
                 <Input
                    prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                    type = 'password'
                    placeholder = '请输入设置密码'
                 />
              ) }
           </FormItem>
           <FormItem>
              { getFieldDecorator('password', {
                 rules: [
                    { required: true, message: '请输入确认密码!' },
                    { whitespace: true, message: '不能输入空格' },
                    { validator: this.validatorPass }
                 ]
              })(
                 <Input
                    prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                    type = 'password'
                    placeholder = '请再次输入密码'
                 />
              ) }
           </FormItem>
           <FormItem>
              { getFieldDecorator('phone', {
                 rules: [
                    { required: true, message: '请输入手机号!' },
                    { whitespace: true, message: '不能输入空格' },
                    { pattern: phone, message: '手机号格式错误' }
                 ]
              })(
                 <Input
                    prefix = {
                       <Icon type = 'mobile' style = { { color: 'rgba(0,0,0,.25)' } } />
                    }
                    type = 'text'
                    maxLength = { 11 }
                    placeholder = '请输入手机号'
                 />
              ) }
           </FormItem>
           <FormItem>
              { getFieldDecorator('code', {
                 rules: [
                    { required: true, message: '请输入验证码' },
                    { whitespace: true, message: '不能输入空格' }
                 ]
              })(
                 <Input
                    prefix = { <Icon type = 'code' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                    type = 'text'
                    placeholder = '请输入验证码'
                    onKeyPress = { e => enterKeySubmit(e, form) }
                 />
              ) }
           </FormItem>
           <FormItem className = 'form-submit'>
              <Button type = 'primary' htmlType = 'submit'>
            提&nbsp;&nbsp;&nbsp;交
              </Button>
           </FormItem>
        </Form>
     );
  }
}
const Register = Form.create({ name: 'register-from' })(RegisterFrom);
export default Register;
