// 任务管理 --- 任务编辑
import React, { Component } from 'react'
import { Table, Button } from 'antd'
import './style.less'
import AddTask from './addTask' // 新增--编辑

class TaskEdit extends Component {
   constructor (props) {
      super(props)
      this.state={
         columns:[
            {
               title: '任务名称',
               dataIndex: 'name',
               key: 'name'
            },
            {
               title: '负责人',
               dataIndex: 'man',
               key: 'man'
            },
            {
               title: '任务描述',
               dataIndex: 'area',
               key: 'area'
            },
            {
               title: '上线时间',
               dataIndex: 'time',
               key: 'time'
            },
            {
               title: '版本号',
               dataIndex: 'nuber',
               key: 'numer'
            },
            {
               title: '任务状态',
               dataIndex: 'status',
               key: 'status',
               align: 'center'
            },
            {
               title: '状态修改',
               key: 'change',
               align: 'center',
               render: () => (
                  <span className = 'change' >
                     { status==0 ?<a>开始</a>:'' }
                     <a>结束</a>
                     <a>延期</a>
                  </span>
               )
            },
            {
               title: '操作',
               key: 'action',
               align: 'center',
               render: () => (
                  <span className = 'action' >
                     <a>编辑</a>
                     <a>删除</a>
                  </span>
               )
            }
         ],
         isAddCompile: 0,
         addMoadlVisible: false,
         // 新增编辑弹窗表单数据
         addCompileData: {
            pid: '', // 项目id
            img: '', // 项目预览图片
            pName: '', // 项目名称
            developer: '', // 开发人员
            description: '', // 项目描述
            date: '',
            repositoryUrl: '', // 仓库地址
            status: '0' // 测试预览地址
         },
         data:[
            { key:1,
               name: 'sd' }
         ]
      }

   }
   // 新增和编辑--弹窗显示隐藏
  modalShowHide = form => {
     let { addMoadlVisible, addCompileData } = this.state;
     if (addMoadlVisible) {
        addMoadlVisible = false
        addCompileData = {
           pid: '', // 项目id
           img: '', // 项目预览图片
           pName: '', // 项目名称
           developer: '', // 开发人员
           description: '', // 项目描述
           date: '2019-08-02',
           repositoryUrl: '', // 仓库地址
           status: '0' // 测试预览地址
        }
        form.resetFields()
     } else {
        addMoadlVisible = true
     }
     this.setState({
        addMoadlVisible,
        addCompileData
     });
  }
  // 新增和编辑--弹窗确定
  modalConfirm = (e, form) => {
     e.preventDefault();
     let { isAddCompile } = this.state;
     form.validateFields((err, values) => {
        if (!err) {
           const value = {
              ...values,
              'date': values['date'].format('YYYY-MM-DD')
           }
           isAddCompile === 0
              ? this.addItemPost(value, form)
              : this.compileItemPost(value, form);
        }
     });
  }
 // 点击新增按钮 显示弹窗
 addItem = () => {
    this.setState(
       {
          isAddCompile: 0
       },
       () => {
          this.modalShowHide();
       }
    );
 }
 // 新增--项目--提交
 addItemPost = (values) => {
    console.log(values)
 }
 // 编辑--项目 数据获取
 compileItem = (e,item) => {
    e.stopPropagation()
    let _this = this;
    console.log(item)
    this.setState(
       {
          isAddCompile: 1,
          addCompileData: {
             ..._this.state.addCompileData,
             ...item
          }
       },
       () => {
          this.modalShowHide();
       }
    );
 }
 // 编辑--项目--提交
 compileItemPost = (values) => {
    console.log(values)

 }
 // 删除指定项目
 deletItem = (item) => {
    console.log(item)

 }
 render (){
    let { columns , data,addCompileData,addMoadlVisible } = this.state
    return ( 
       <div>
          <div className = 'item-add'>
             <Button icon = 'plus' onClick = { this.addItem }>
                    新增
             </Button>
          </div> 
          <Table columns = { columns } dataSource = { data } />
          <AddTask 
             addCompileData = { addCompileData }
             addMoadlVisible = { addMoadlVisible }
             modalShowHide = { this.modalShowHide }
             modalConfirm = { this.modalConfirm }
             preAddrAdd = { this.preAddrAdd }
             preAddrDelete = { this.preAddrDelete }
             preAddrOnchange = { this.preAddrOnchange }
          /> 
       </div>
        
    )
 } 
}
export default TaskEdit;