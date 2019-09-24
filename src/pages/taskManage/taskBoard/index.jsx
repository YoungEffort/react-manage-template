// 任务管理 --- 任务看板
import React, { Component } from 'react'
import  { Row, Col, Card, Empty } from 'antd'
import TaskTap from './taskTap'
import './style.less'
import {
   querylist
} from '@/api/taskBoard'
class TaskBoard extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // tap 选中
         tapActive: '0',
         // 顶部tap
         tapData: [
            { key: '0', tapName: '新建' },
            { key: '1', tapName: '进行中' },
            { key: '2', tapName: '已关闭' }
         ],
         taskList:[

         ]
      }
   }
   componentDidMount () {
      this.initView()
   }
   // 点击tap
   clickTap = (key) => {
      this.setState ({
         tapActive: key,
         taskList:[]
      })
      this.initView()
   }

  // 视图初始化
  initView = ( queryData ) => {
     querylist({
        ...queryData
     }).then(res => {
        if (parseFloat(res.code) === 200) {
           this.setState({
              taskList: res.data
           });
        }
     });
  }

  render () {
     let { tapActive,tapData,taskList }  = this.state
     return (
        <div className = 'task-board'>
           <TaskTap
              tapActive = { tapActive }
              tapData = { tapData }
              clickTap = { this.clickTap }
           />
           <Row gutter = { 16 }>
              { taskList.map((item,i) => 
                 <Col span = { 4 } key = { i } className = 'mrb-10'>
                    <Card style = { { width: '97%' } } hoverable>
                       <h3 className = 'mrb-5'>任务名称：{ item.tech }</h3>
                       <p className = 'mrb-5 cl1'>负责人：{ item.principal }</p>
                       <p className = 'mrb-5 cl1'>任务描述：{ item.principal }</p>
                       <p className = 'mrb-5 cl1'>上线时间：{ item.principal }</p>
                       <p className = 'mrb-5 cl1'>版本号：{ item.principal }</p>
                       <p className = 'mrb-5 cl1'>任务状态：{ item.principal }</p>

                    </Card>
                 </Col>
              ) }
           </Row>
           {
              taskList&&taskList.length<=0? <div className = 'g-no-data'><Empty /></div>: ''
           }
        </div>
     )
  }
}
export default TaskBoard