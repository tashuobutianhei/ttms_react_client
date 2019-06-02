import React from 'react';
import { Tabs,Table,} from 'antd';
import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'


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
      outBlackHandle(e){

      }
      render() {
        let {day,weekend,all} = CONST.mangerDate.money;
        return (
        <div>
          <Tabs defaultActiveKey="day" >
            <TabPane key="day" tab="日榜" style={{textAlign:'center'}}>
              <Table dataSource={day} >
                <Column title="影片id" dataIndex="id" key="userId" align="center"/>
                <Column title="影片名称" dataIndex="name" key="userName" align="center"/>
                <Column
                    title="封面"
                    dataIndex="img"
                    align="center"
                    key="img"
                    render={(text, record, index) => (
                    <div>
                        <img style={{width:'100px'}} src="/img/movie.jpg"></img>
                    </div>
                    )}/>
                <Column title="上映时间" dataIndex="onlineTime" key="onlineTime"align="center" />
                <Column title="排行" dataIndex="rank" key="rank"align="center" />
                <Column title="当日票房" dataIndex="money" key="money"align="center" />
               </Table>
            </TabPane>
            <TabPane key="weekend" tab="周榜" >
              <Table dataSource={weekend} >
                <Column title="影片id" dataIndex="id" key="userId" align="center"/>
                <Column title="影片名称" dataIndex="name" key="userName" align="center"/>
                <Column
                    title="封面"
                    dataIndex="img"
                    align="center"
                    key="img"
                    render={(text, record, index) => (
                    <div>
                        <img style={{width:'100px'}} src="/img/movie.jpg"></img>
                    </div>
                    )}/>
                <Column title="上映时间" dataIndex="onlineTime" key="onlineTime"align="center" />
                <Column title="排行" dataIndex="rank" key="rank"align="center" />
                <Column title="当日票房" dataIndex="money" key="money"align="center" />
               </Table>
            </TabPane>
            <TabPane key="all" tab="总排行榜" >
            <Table dataSource={all} >
                <Column title="影片id" dataIndex="id" key="userId" align="center"/>
                <Column title="影片名称" dataIndex="name" key="userName" align="center"/>
                <Column
                    title="封面"
                    dataIndex="img"
                    align="center"
                    key="img"
                    render={(text, record, index) => (
                    <div>
                       <img style={{width:'100px'}} src="/img/movie.jpg"></img>
                    </div>
                    )}/>
                <Column title="上映时间" dataIndex="onlineTime" key="onlineTime"align="center" />
                <Column title="排行" dataIndex="rank" key="rank"align="center" />
                <Column title="当日票房" dataIndex="money" key="money"align="center" />
               </Table>
            </TabPane>
           </Tabs>
        </div>
        );

    }
}

export default Rank;
