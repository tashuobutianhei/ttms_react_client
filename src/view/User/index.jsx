import React from 'react';
import { Menu,Icon,Layout } from 'antd';
import {  Route, Switch,withRouter } from 'react-router-dom'



import 'antd/dist/antd.css'
import  './index.scss'

import UserInfo from '../UserInfo'
import UserTicket from '../UserTicket'
import UserComment from '../UserComment'


const { Sider, Content } = Layout;



class Manger extends React.Component {
    constructor(props) {
        super(props);
      } 
      MenuClickHandle(key){
          this.props.history.push(`/User/${this.props.match.params.userId}/${key.key.split('_')[1]}`);
      }
      render() {
        let key = this.props.location.pathname.split('/')[3];

        return (
                <div>
                    <Layout>
                        <Sider style={{minHeight:'700px',borderTop:'1px white solid'}}>
                            <Menu
                            defaultSelectedKeys={[`user_${key}`]}
                            mode="inline"
                            theme="dark"
                            onClick={this.MenuClickHandle.bind(this)}
                            >
                            <Menu.Item key="user_info">
                                <Icon type="pie-chart" />
                                <span>个人信息</span>
                            </Menu.Item>
                            <Menu.Item key="user_ticket">
                                <Icon type="desktop" />
                                <span>观影记录</span>
                            </Menu.Item>
                            <Menu.Item key="user_comment">
                                <Icon type="inbox" />
                                <span>评论记录</span>
                            </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            <Switch>
                                <Route exact path="/User/:userId/info" component={UserInfo} ></Route>
                                <Route exact path="/User/:userId/ticket"  component={UserTicket} ></Route>
                                <Route exact path="/User/:userId/comment"  component={UserComment}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </div>
        );

    }
}

export default withRouter(Manger);
