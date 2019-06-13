import React from 'react';
import { Layout, Menu, Avatar, BackTop, Dropdown, Icon } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { userLogin, userLogout, userManger } from './actions/user.js'

import tool from './common/const/tool'

import axios from 'axios'
import LoginModal from './component/LoginModel/index.jsx'
import Home from './view/Home/index.jsx'
import Movie from './view/Movie/index.jsx'
import Rank from './view/Rank/index.jsx'
import MovieItem from './view/MovieItem/index.jsx'
import Manger from './view/Manger/index.jsx'
import User from './view/User/index.jsx'


import 'antd/dist/antd.css'
import './router.scss'
axios.defaults.withCredentials = true

const { Header, Content, Footer } = Layout;

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userInfo => {
      dispatch(userLogin(userInfo))
    },
    onLogout: () => {
      dispatch(userLogout())
    },
    onuserManger: userIdentity => {
      dispatch(userManger(userIdentity))
    }
  }
}

class RootRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalvisible: false
    }
  }
  componentWillUpdate(l, n) {
    console.log(l)
    console.log(n)
  }
  MenuClickHandle(e) {
    //路由跳转
    if (e.key === 'Manger') {
      if (this.props.user.userIdentity !== 'manger') {
        this.props.history.push(`/Home`)
      }
    }
    this.props.history.push(`/${e.key}`)
  }
  MyselfClick() {
    this.props.history.push(`/user/${this.props.user.userId}`)
  }
  loginClick(e) {
    //点击登陆框
    this.setState({
      loginModalvisible: true
    })
    // axios().then({
    //   this.props.onLogin({
    //     userId:'1997120300001',
    //     userName:'tashuobutianhei',
    //     userNickName:'她说不天黑',
    //     userIdentity:'manger',
    //     userAvatar:'avatar.jpg'
    //   })
    // })
  }
  logoutClick() {
    tool.delCookie("TTMS_token");
    tool.delCookie('TTMS_username')
    this.props.onLogout();
  }
  handleOk() {

  }
  handleCancel() {
    this.setState({
      loginModalvisible: false
    })
  }

  componentWillMount() {
    //console.log(this.props.onLogin);
    //假设一直为登录状态

    let token = tool.getCookie('TTMS_token');
    let username = tool.getCookie('TTMS_username');
    if (token) {
      console.log(this.props)
      this.props.onLogin({
        userId: '1997120300001',
        userName: username,
        userIdentity: '',
        userAvatar: 'avatar.jpg',
        userNickName: username
      })

      //鉴权
      axios({
        method: 'post',
        url: '/user/checkManager',
        headers: { "Content-Type": "multipart/form-data" },
        data: tool.transformData({
          username: username,
        })
      }).then(res => {
        if (res.data.status == 0) {
          this.props.onuserManger('manger')
        }
      }).catch(err => {
        console.log(err)
      })

    } else {

    }

  }
  render() {
    let key = this.props.location.pathname.split('/')[1];

    const menu = (
      <Menu>
        <Menu.Item key="my" onClick={this.MyselfClick.bind(this)}>个人中心</Menu.Item>
        <Menu.Item key="logout" onClick={this.logoutClick.bind(this)}>退出登录</Menu.Item>
      </Menu>
    );


    return (
      <Layout className="layout">
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"

            defaultSelectedKeys={[key]}
            style={{ lineHeight: '64px' }}
            onClick={this.MenuClickHandle.bind(this)}
          >
            <Menu.Item key="Home">主页</Menu.Item>
            <Menu.Item key="Movie">电影</Menu.Item>
            <Menu.Item key="Rank">排行榜</Menu.Item>
            {
              this.props.user.userIdentity === 'manger' ?
                <Menu.Item key="Manger">管理系统</Menu.Item> : ''
            }

          </Menu>
          <div className="myvalue">
            {
              this.props.user.userName ?
                <div>
                  <Avatar icon="user" src={`/img/${this.props.user.userAvatar}`} />

                  <Dropdown overlay={menu} className="div">
                    <a className="ant-dropdown-link" href="#">
                      <span>{this.props.user.userNickName}</span>
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
                :
                <div>
                  <Avatar icon="user" />
                  <span className="div" style={{ color: 'white', cursor: 'pointer' }} onClick={this.loginClick.bind(this)}>登录</span>
                </div>
            }
          </div>
        </Header>
        <Content className="content">
          <BackTop></BackTop>
          <Switch>
            <Route exact path="/Home" component={Home} />
            <Route path="/Movie" component={Movie} />
            <Route path="/Rank" component={Rank} />
            <Route path="/MovieItem/:movieId" component={MovieItem}></Route>
            <Route path="/User/:userId" component={User} />
            <Route path="/Manger" render={() => (
              this.props.user.userIdentity === 'manger'
               ? (
                <Manger></Manger>
              ) : (
                  <Redirect to="/Home" />
                )
            )} />
            <Redirect to='/Home'></Redirect>
          </Switch>
        </Content>
        <Footer className="footer">Salted fish movie ©2019 Created by lizilong.rain</Footer>
        <LoginModal
          visible={this.state.loginModalvisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel.bind(this)}
          onlogin={this.props.onLogin}></LoginModal>
      </Layout>
    );

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RootRoute));
