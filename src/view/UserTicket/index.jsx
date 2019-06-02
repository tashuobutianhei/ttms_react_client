import React from 'react';
import { Radio,Tabs,Table} from 'antd';
import CONST from '../../common/const/index'
import Zmage from 'react-zmage'


import 'antd/dist/antd.css'
import  './index.scss'

import TicketOutModal from '../../component/TicketOutModal/index'
import TicketRankModal from '../../component/TicketRankModal/index'


const TabPane = Tabs.TabPane;
const { Column } = Table;


class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          blackUserList:CONST.mangerDate.mangerUser.BlackUser
        }
      } 
      readyBlackHandle(e){
        let midarray = this.state.blackUserList;
        midarray.push(e)
        this.setState({
          blackUserList:midarray
        })
      }
      readyoutHandle(e) {

      }
      readyRank(e){
        console.log(e)
      }
      render() {
        let ticket = CONST.ticket;
        ticket.forEach((item)=>{
          item.MovieSeat = `${item.seat.row}排${item.seat.col}座`;
        })
        return (
        <div>
          <Tabs defaultActiveKey="will" >
            <TabPane key="will" tab="待观看" style={{textAlign:'center'}}>
              <Table dataSource={ticket} >
                <Column title="电影名称" dataIndex="name" key="name" align="center"/>
                <Column
                    title="封面"
                    dataIndex="img"
                    align="center"
                    key="img"
                    render={(text, record, index) => (
                      <div>
                          <Zmage src="/img/movie.jpg" style={{width:'50px'}}></Zmage>
                      </div>
                    )}/>
                <Column title="开场时间" dataIndex="startTime" key="startTime"align="center" />
                <Column title="影厅" dataIndex="room" key="room"align="center" />
                <Column title="位置" dataIndex="MovieSeat" key="MovieSeat"align="center" />
                <Column title="票价" dataIndex="money" key="money"align="center" />
                <Column
                    title="操作"
                    dataIndex="buy"
                    align="center"
                    key="buy"
                    render={(text, record, index) => (
                    <div>
                       <TicketOutModal userInfo={record} readyBlackHandle={this.readyoutHandle.bind(this)}></TicketOutModal>
                    </div>
                    )}/>
               </Table>
            </TabPane>
            <TabPane key="all" tab="全部观影记录" style={{textAlign:'center'}} >
              <Table dataSource={ticket} >
                <Column title="电影名称" dataIndex="name" key="name" align="center"/>
                <Column
                    title="封面"
                    dataIndex="img"
                    align="center"
                    key="img"
                    render={(text, record, index) => (
                      <div>
                          <Zmage src="/img/movie.jpg" style={{width:'50px'}}></Zmage>
                      </div>
                    )}/>
                <Column title="开场时间" dataIndex="startTime" key="startTime"align="center" />
                <Column title="影厅" dataIndex="room" key="room"align="center" />
                <Column title="位置" dataIndex="MovieSeat" key="MovieSeat"align="center" />
                <Column title="票价" dataIndex="money" key="money"align="center" />
                <Column
                    title="操作"
                    dataIndex="buy"
                    align="center"
                    key="buy"
                    render={(text, record, index) => (
                    <div>
                       <TicketRankModal userInfo={record} readyRank={this.readyRank.bind(this)}></TicketRankModal>
                    </div>
                    )}/>
               </Table>
            </TabPane>
           </Tabs>
        </div>
        );

    }
}

export default Rank;
