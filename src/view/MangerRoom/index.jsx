import React from 'react';
import {Tabs,Table,Button} from 'antd';


import 'antd/dist/antd.css'
import  './index.scss'

import AddRoomModal from '../../component/AddRoomModal'
import DesRoomModal from '../../component/DesRoomModal'

const TabPane = Tabs.TabPane;

const { Column } = Table;


class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomList:[]
        }
      } 

      onAddRoomClick(e){

          let midArray = this.state.roomList;
          let seat = [];

          for(let i = 0;i<e.row*e.col;i++){
            seat.push('1');
          }

          midArray.push({
                id:'1',
                name:e.name,
                row:e.row,
                col:e.col,
                seat:seat
          })

          this.setState({
              roomList: midArray
          })
      }

      desigonOk(e) {
        //   console.log(e)
          /*
          id:string,
          col:string,
          row:string,
          name:string,
          seat:array
          */
         let index = ''
         this.state.roomList.forEach((item,index) => {
            if(item.id === e.id){
                 index = index;
            }
         })

         let midArray = this.state.roomList;
         midArray[index] = e

         this.setState({
             roomList:midArray
         })

      }

      render() {
        return (
        <div>
          <Tabs defaultActiveKey="room" >
            <TabPane key="room" tab="演出厅列表" >
              <AddRoomModal onAddRoomClick={this.onAddRoomClick.bind(this)}></AddRoomModal>
              <Table  dataSource={this.state.roomList}>
                <Column title="演出厅id" dataIndex="id" key="id" align="center"/>
                <Column title="演出厅名字" dataIndex="namem" key="name" align="center"/>
                <Column title="行数（Row）" dataIndex="row" key="row" align="center"/>
                <Column title="列数（Col)" dataIndex="col" key="col"align="center" />
                 <Column
                    title="删除演出厅"
                    dataIndex="delete"
                    align="center"
                    key="delete"
                    render={(text, record, index) => (
                        <Button  
                        style={{backgroundColor:'rgb(239,66,56)',color:'white'}}
                        >删除演出厅{text}</Button>
                    )}/>
                 <Column
                    title="设计"
                    dataIndex="desigon"
                    align="center"
                    key="desigon"
                    render={(text, record, index) => (
                        <DesRoomModal roomInfo = {record}  desigonOk={this.desigonOk.bind(this)}></DesRoomModal>
                    )}/>
               </Table>
            </TabPane>
           </Tabs>
        </div>
        );

    }
}

export default Rank;
