/*
   修改密码弹窗
*/
import React, { Component } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { phone, clearTrim } from '@/utils/reg';
const FormItem = Form.Item;
class PassModalForm extends Component {
   constructor (props) {
      super(props);
      this.state = {
         passMoadlInit: {
            title: '修改密码',
            width: 420,
            wrapClassName: 'pass-moadl'
         }
      };
   }
  // 点击确定
  onOkModal = e => {
     e.preventDefault();
     let { changePassPost, form } = this.props;
     form.validateFields((err, values) => {
        if (!err) {
           values = clearTrim(values);
           changePassPost(values, form);
        }
     });
  };
  // 取消
  onCancelModal = () => {
     let { passModalHideShow, form } = this.props;
     passModalHideShow();
     form.resetFields();
  };
  render () {
     let { passMoadlInit } = this.state;
     let { passMoadlVisible, form } = this.props;
     const { getFieldDecorator } = form;
     return (
        <Modal
           { ...passMoadlInit }
           visible = { passMoadlVisible }
           onOk = { this.onOkModal }
           onCancel = { this.onCancelModal }
        >
           <Form>
              <FormItem>
                 { getFieldDecorator('loginName', {
                    rules: [
                       { required: true, message: '请输入用户名' },
                       { whitespace: true, message: '不能输入空格' }
                    ]
                 })(
                    <Input
                       prefix = {
                          <Icon type = 'user' style = { { color: 'rgba(0,0,0,.25)' } } />
                       }
                       placeholder = '请输入用户名'
                    />
                 ) }
              </FormItem>
              <FormItem>
                 { getFieldDecorator('phone', {
                    rules: [
                       { required: true, message: '请输入手机号' },
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
                 { getFieldDecorator('password', {
                    rules: [
                       { required: true, message: '请输入密码!' },
                       { whitespace: true, message: '不能输入空格' }
                    ]
                 })(
                    <Input
                       prefix = {
                          <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } />
                       }
                       type = 'password'
                       placeholder = '请输入设置密码'
                    />
                 ) }
              </FormItem>
           </Form>
        </Modal>
     );
  }
}

const PassModal = Form.create({ name: 'pass-modal-form' })(PassModalForm);
export default PassModal;
