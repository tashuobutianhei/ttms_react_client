import React from 'react';
import { Tabs,Table,Button,Avatar, AutoComplete,Popconfirm} from 'antd';
import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'

import BlackUserModal from '../../component/BlackUserModal/index'

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
        let userList = CONST.mangerDate.mangerUser.user;
        return (
        <div>
          <Tabs defaultActiveKey="user" >
            <TabPane key="user" tab="用户列表" style={{textAlign:'center'}}>
              <AutoComplete placeholder="根据id，用户名搜索用户" style={{marginBottom:'15px'}}></AutoComplete>
              <Table dataSource={userList} >
                <Column title="用户id" dataIndex="userId" key="userId" align="center"/>
                <Column title="用户名" dataIndex="userName" key="userName" align="center"/>
                <Column
                    title="头像"
                    dataIndex="avatar"
                    align="center"
                    key="avatar"
                    render={(text, record, index) => (
                    <div>
                        <Avatar src='/img/avatar.jpg'></Avatar>
                    </div>
                    )}/>
                <Column title="手机号" dataIndex="tel" key="tel"align="center" />
                <Column title="邮箱" dataIndex="email" key="email"align="center" />
                <Column title="地区" dataIndex="area" key="area"align="center" />
                <Column
                    title="操作"
                    dataIndex="buy"
                    align="center"
                    key="buy"
                    render={(text, record, index) => (
                    <div>
                       <BlackUserModal userInfo={record} readyBlackHandle={this.readyBlackHandle.bind(this)}></BlackUserModal>
                    </div>
                    )}/>
               </Table>
            </TabPane>
            <TabPane key="black" tab="黑名单" style={{textAlign:'center'}} >
              <AutoComplete placeholder="根据id，用户名搜索用户" style={{marginBottom:'15px'}}></AutoComplete>
              <Table dataSource={this.state.blackUserList} >
              <Column title="用户id" dataIndex="userId" key="userId" align="center"/>
                <Column title="用户名" dataIndex="userName" key="userName" align="center"/>
                <Column
                    title="头像"
                    dataIndex="avatar"
                    align="center"
                    key="avatar"
                    render={(text, record, index) => (
                    <div>
                        <Avatar src='/img/avatar.jpg'></Avatar>
                    </div>
                    )}/>
                <Column title="手机号" dataIndex="tel" key="tel"align="center" />
                <Column title="邮箱" dataIndex="email" key="email"align="center" />
                <Column title="地区" dataIndex="area" key="area"align="center" />
                <Column title="拉黑理由" dataIndex="reason" key="reason"align="center" />
                <Column
                    title="操作"
                    dataIndex="buy"
                    align="center"
                    key="buy"
                    render={(text, record, index) => (
                    <div>
                          <Popconfirm
                            title="确定将该用户从黑名单移出去?"
                            onConfirm={this.outBlackHandle.bind(this,record)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="primary">解禁</Button>
                          </Popconfirm>
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
