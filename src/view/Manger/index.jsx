import React from 'react';
import { Menu,Icon,Layout } from 'antd';
import {  Route, Switch,withRouter,Redirect } from 'react-router-dom'



import 'antd/dist/antd.css'
import  './index.scss'

import MangerMovie from '../MangerMovie/index.jsx'
import MangerPlay from '../MangerPlay'
import MangerRoom from '../MangerRoom'
import MangerWorker from '../MangerWorker'
import MangerUser from '../MangerUser'
import MangerMoney from '../MangerMoney'


const {  Sider, Content } = Layout;



class Manger extends React.Component {
    constructor(props) {
        super(props);
      } 
      MenuClickHandle(key){
        //   console.log(key)
          this.props.history.push(`/Manger/${key.key.split('_')[1]}`);
      }
      render() {
        let key = this.props.location.pathname.split('/')[2];

        return (
                <div>
                    <Layout>
                        <Sider style={{minHeight:'700px',borderTop:'1px white solid'}}>
                            <Menu
                            defaultSelectedKeys={[`manger_${key}`]}
                            mode="inline"
                            theme="dark"
                            onClick={this.MenuClickHandle.bind(this)}
                            >
                            <Menu.Item key="manger_movie">
                                <Icon type="pie-chart" />
                                <span>电影管理</span>
                            </Menu.Item>
                            <Menu.Item key="manger_play">
                                <Icon type="desktop" />
                                <span>排片管理</span>
                            </Menu.Item>
                            <Menu.Item key="manger_room">
                                <Icon type="inbox" />
                                <span>演出厅管理</span>
                            </Menu.Item>
                            {/* <Menu.Item key="manger_worker">
                                <Icon type="inbox" />
                                <span>员工管理</span>
                            </Menu.Item> */}
                            <Menu.Item key="manger_user">
                                <Icon type="inbox" />
                                <span>用户管理</span>
                            </Menu.Item>
                            <Menu.Item key="manger_money">
                                <Icon type="inbox" />
                                <span>票房统计</span>
                            </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            <Switch>
                                <Route exact path="/Manger/movie" component={MangerMovie} ></Route>
                                <Route exact path="/Manger/play"  component={MangerPlay} ></Route>
                                <Route exact path="/Manger/room"  component={MangerRoom}></Route>
                                {/* <Route exact path="/Manger/worker" component={MangerWorker}></Route> */}
                                <Route exact path="/Manger/user"   component={MangerUser}></Route>
                                <Route exact path="/Manger/money"  component={MangerMoney}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </div>
        );

    }
}

export default withRouter(Manger);
