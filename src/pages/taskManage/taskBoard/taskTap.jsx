// 顶部
import React, { Component } from 'react'

class TaskTap extends Component {
   initView = () =>  {
      let  { tapActive, tapData, clickTap } = this.props
      return tapData.map((item) => {
         return (
            <li key =  { item.key } 
               className =  { tapActive === item.key ? 'task-tap-row f-l cl-0' : 'task-tap-row f-l' }
               onClick = { () =>  clickTap(item.key) }
            >
               { item.tapName }
            </li>
         )
      })
   }
   render () {
      return (
         <div className = 'task-tap'>
            <ul className = 'task-tap-container f-c'>
               {
                  this.initView()
               }
            </ul>
         </div>
      )
   }
}
export default  TaskTap