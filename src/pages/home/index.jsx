/*
   首页
   秦国胜
   2019-08-26
*/
import React, { Component } from 'react'
import { Card, Empty  } from 'antd'
import { getHomeList } from '@/api/home'
import './style.less'
class Home extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // logoImg
         logoImg: [ 
            'item.jpg',
            'web.jpg',
            'tem.jpg'
         ],
         // 文本计算
         modalText: '一',
         // 首页数据
         listData: []
      }
   }
   componentDidMount () {
      this.init()
   }
   // 初始化
   init = () => {
      getHomeList({})
         .then((res) => {
            if( parseFloat(res.code) === 200){
               let listData = JSON.parse(JSON.stringify(res.data))
               listData.map((item,index) => {
                  item.text = this.initText(index)
                  item.key = index
               })
               this.setState({
                  listData
               })
            }
         })
   }
   // 文本渲染
   initText = (index) => {
      let text = '一'
      switch (index) {
      case 1:
         text = '二'
         break
      case 2:
         text = '三'
         break   
      default:
         text = '一'
         break   
      }
      return text
   }
   // 点击卡片跳转路由
   goPages = (url) => {
      console.log(this.props)
      this.props.history.push({ pathname: url });
   }
   render () {
      let { listData, logoImg } = this.state
      return (
         <div className = 'home-container'>
            {
               listData.map((item,index) => {
                  return (
                     <Card
                        onClick = { () => this.goPages(item.url) }
                        key = { item.key }
                        hoverable
                        cover = {
                           <img
                              className = 'item-card-img'
                              alt = ''
                              src = { require('@/assets/images/home/' + logoImg[index] ) }
                           />
                        }
                     >
                        <p className = 'card-text leave_out cl-0'>
                            模块{ item.text }：{ item.moduleName }
                        </p>
                        <p className = 'card-text leave_out cl-1'>
                            总数：{ item.count }
                        </p>
                     </Card>
                  );
               })
            }
            {
               listData && listData.length <= 0 ?
                  <div className = 'g-no-data'>
                     <Empty />
                  </div>
                  : ''
            }
         </div>
      )
   }
}
export default Home;
