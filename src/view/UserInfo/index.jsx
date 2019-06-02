import React from 'react';
import {Row, Col, Avatar} from 'antd';
import { connect } from 'react-redux'



import 'antd/dist/antd.css'
import  './index.scss'

import UserAvatarModal from '../../component/UserAvatarModal/index'
import UserNameModal from '../../component/UserNameModal/index'
import UserBrithModal from '../../component/UserBirthModal/index'
import UserTelModal from '../../component/UserTelModal/index'
import UserPasswordModal from '../../component/UserPasswordModal/index'





const mapStateToProps = state => {
    // console.log(state)
    return {
      user: state.user
    }
  }

class Rank extends React.Component {
    constructor(props) {
        super(props);
        //假设请求了信息
        this.state={
            user:{
                userNickName:'她说不天黑',
                tel:'18392120131',
                birthday:'1997/12/03',
                Avatar:'/img/avatar.jpg',
                userName:'tashuobutianhei'
            }
        }
      } 
      ChangeAvatar(e){
        let midobj = this.state.user;
        midobj.Avatar = e;
        this.setState({
            user:midobj
        })
      }
      changeUserNickName(e){
        let midobj = this.state.user;
        midobj.userNickName = e;
        this.setState({
            user:midobj
        })
      }
      changeBirthDay(e){
        let midobj = this.state.user;
        midobj.birthday = e;
        this.setState({
            user:midobj
        })
      }
      changeTel(e){
        let midobj = this.state.user;
        midobj.tel = e;
        this.setState({
            user:midobj
        })
      }
      changePassword(e){
          console.log(e)
      }
      render() {
        return (
            <div className="userInfo">
                <div className="userInfo_H">
                    <h1>个人信息</h1>
                    <h5>账户设置:用户名{this.state.user.userName}</h5>
                </div>
                <Row className="userInfo_Row">
                    <Col span={2}></Col>
                    <Col span={2} className="userInfo_sapn">头像</Col>
                    <Col span={1} className="userInfo_hr"><div></div></Col>
                    <Col span={10}><Avatar src={this.state.user.Avatar}></Avatar></Col>
                    <Col span={4}><UserAvatarModal ChangeAvatar={this.ChangeAvatar.bind(this)}></UserAvatarModal></Col>
                </Row>
                <Row className="userInfo_Row">
                    <Col span={2}></Col>
                    <Col span={2} className="userInfo_sapn">昵称</Col>
                    <Col span={1} className="userInfo_hr"><div></div></Col>
                    <Col span={10}>{this.state.user.userNickName}</Col>
                    <Col span={4}><UserNameModal changeUserNickName={this.changeUserNickName.bind(this)}></UserNameModal></Col>
                </Row>
                <Row className="userInfo_Row">
                <Col span={2}></Col>
                    <Col span={2} className="userInfo_sapn">生日</Col>
                    <Col span={1} className="userInfo_hr"><div></div></Col>
                    <Col span={10}>{this.state.user.birthday?this.state.user.birthday:'快去补充生日信息'}</Col>
                    <Col span={4}><UserBrithModal changeBirthDay={this.changeBirthDay.bind(this)}></UserBrithModal></Col>
                </Row>
                <Row className="userInfo_Row">
                <Col span={2}></Col>
                    <Col span={2} className="userInfo_sapn">绑定手机</Col>
                    <Col span={1} className="userInfo_hr"><div></div></Col>
                    <Col span={10}>{this.state.user.tel?this.state.user.tel:'快去绑定手机'}</Col>
                    <Col span={4}><UserTelModal changeTel={this.changeTel.bind(this)}></UserTelModal></Col>
                </Row>
                <Row className="userInfo_Row">
                    <Col span={2}></Col>
                    <Col span={2} className="userInfo_sapn">登录密码</Col>
                    <Col span={1} className="userInfo_hr"><div></div></Col>
                    <Col span={10}>**********</Col>
                    <Col span={4}><UserPasswordModal changePassword={this.changePassword.bind(this)}></UserPasswordModal></Col>
                </Row>
            </div>
        );

    }
}

export default connect(
    mapStateToProps
)(Rank) ;
