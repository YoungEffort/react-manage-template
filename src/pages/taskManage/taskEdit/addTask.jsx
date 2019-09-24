// 新增任务 编辑任务
import React, { Component } from 'react';
import { Form, Input, Modal,DatePicker,Radio  } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class AddCompileItemFom extends Component {
   constructor (props) {
      super(props);
      this.state = {
         popconfirmInit: {
            placement: 'top',
            title: '是否确认删除'
         },
         modalInit: {
            title: '添加项目',
            width: 480,
            wrapClassName: 'add-itme-board-modal'
         },
         imageUrl: '',
         loading: false
      };
   }

   normFile = e => {
      if (Array.isArray(e)) {
         return e;
      }
      return e && e.fileList;
   };
   render () {
      let { modalInit } = this.state;
      let { addMoadlVisible, form, modalShowHide, modalConfirm } = this.props;
      const { getFieldDecorator } = form;
      return (
         <Modal
            { ...modalInit }
            visible = { addMoadlVisible }
            onOk = { e => modalConfirm(e, form) }
            onCancel = { () => modalShowHide(form) }
         >
            <Form layout = 'inline'>
               <FormItem label = '项目名称'>
                  { getFieldDecorator('pName', {
                     rules: [
                        { required: true, message: '请输入项目名称' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入项目名称' />) }
               </FormItem>
               <FormItem label = '开发人员'>
                  { getFieldDecorator('developer', {
                     rules: [
                        { required: true, message: '请输入开发人员' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(
                     <TextArea
                        autosize = { { minRows: 3, maxRows: 3 } }
                        placeholder = '请输入开发人员，多个开发人员以“ , ”隔开'
                     />
                  ) }
               </FormItem>
               <FormItem label = '项目描述'>
                  { getFieldDecorator('description', {
                     rules: [
                        { required: true, message: '请输入项目描述!' },
                        { whitespace: true, message: '不能输入空格' },
                        { max: 200, message: '项目描述最大字数200' }
                     ]
                  })(
                     <TextArea
                        autosize = { { minRows: 4, maxRows: 4 } }
                        placeholder = '请输入项目描述，200字以内'
                     />
                  ) }
               </FormItem>
               <Form.Item label = '上线时间'>
                  { getFieldDecorator('date', {
                     rules: [
                        { type: 'object', required: true, message: '请选择上线时间' }
                     ]
                  })(
                     <DatePicker  />
                  ) } 
               </Form.Item>
               <FormItem label = '版本号'>
                  { getFieldDecorator('repositoryUrl', {
                     rules: [
                        { required: true, message: '请输入版本号' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入版本号' />) }
               </FormItem>
               <Form.Item label = '状态'>
                  { getFieldDecorator('status')(
                     <Radio.Group>
                        <Radio value = '0'>未开始</Radio>
                        <Radio value = '1'>进行中</Radio>
                        <Radio value = '2'>已结束</Radio>
                     </Radio.Group>
                  ) }
               </Form.Item>
            </Form>
         </Modal>
      );
   }
}

const AddCompileItem = Form.create({
   name: 'add-compile-from',
   mapPropsToFields (props) {
      return {
         pName: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.pName
         }),
         developer: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.developer
         }),
         description: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.description
         }),
         type: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.type
         }),
         repositoryUrl: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.repositoryUrl
         }),
         status: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.status
         })
      };
   }
})(AddCompileItemFom);
export default AddCompileItem;
