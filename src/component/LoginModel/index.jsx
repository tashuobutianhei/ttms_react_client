import React from 'react';
import { Form, Icon, Input, Checkbox, Modal, message } from 'antd';


import 'antd/dist/antd.css'
import './index.scss'
import tool from '../../common/const/tool'
import axios from 'axios'
axios.defaults.withCredentials = true
class LoginForm extends React.Component {
  gotoReg() {
    this.props.changeStatus('reg')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '至少得告诉我你叫啥呀？!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码呀!不然咋登录' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
                    </a>
          </div>
          <div>
            Or <a href="javascript:;" onClick={this.gotoReg.bind(this)}>快去注册!</a>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'user_login' })(LoginForm);


class RegForm extends React.Component {
  gotoLog() {
    this.props.changeStatus('login')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '至少得告诉我你叫啥呀？!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码呀!不然咋登录' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordAgain', {
            rules: [{ required: true, message: '请输入密码呀!不然咋登录' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="重复输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入密码呀!不然咋登录' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="输入手机号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div>
            Or <a href="javascript:;" onClick={this.gotoLog.bind(this)}>快去登录!</a>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegForm = Form.create({ name: 'user_reg' })(RegForm);

class LoginRegModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'login'
    }
  }
  handleOk(err, values) {
    if (this.state.action === 'login') {
      this.refs.loginForm.validateFields((err, values) => {
        // this.props.onSubmit(err, values)
        if (!err) {
          axios({
            method: 'post',
            url: '/auth',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
              username: values.username,
              password: values.password,
            })
          }).then(res => {
            // console.log(res)
            this.props.onlogin({
              userId: '1997120300001',
              userName: values.username,
              userIdentity: '',
              userAvatar: 'avatar.jpg'
            })
            tool.setCookie('TTMS_token', res.data.data.token);
            tool.setCookie('TTMS_username', values.username);

            this.props.handleCancel();
            this.setState({
              action: 'login'
            })
            this.refs.loginForm.resetFields()
            message.success('登录成功')
          }).catch(err => {
            message.error(`登录失败${err}`)
          })
        }
      });
    } else {
      this.refs.regForm.validateFields((err, values) => {
        // this.props.onSubmit(err, values)
        if (!err) {
          console.log(values)

          axios({
            method: 'post',
            url: '/user/register',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
              username: values.userName,
              password: values.password,
              phone: values.phone
            })
          }).then(res => {
            console.log(res)
            message.success('注册成功')
          }).catch(err => {
            message.error(`注册失败${err}`)
          })
          // this.props.onlogin({
          //   userId: '1997120300001',
          //   userName: '她说不天黑',
          //   userIdentity: 'manger',
          //   userAvatar: 'avatar.jpg'
          // })
          // this.props.handleCancel();
          // this.setState({
          //   action: 'login'
          // })
        }
      });
    }

  }
  changeStatus(e) {
    this.setState({
      action: e
    })
  }
  render() {
    let { visible, handleCancel } = this.props;
    return (
      <Modal
        title={`快！${this.state.action === 'login' ? '登录' : '注册'}！`}
        okText={`${this.state.action === 'login' ? '登录' : '注册'}！`}
        cancelText="算了"
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={handleCancel}
      >
        {
          this.state.action === 'login' ? <WrappedLoginForm ref="loginForm" changeStatus={this.changeStatus.bind(this)}></WrappedLoginForm>
            : <WrappedRegForm ref="regForm" changeStatus={this.changeStatus.bind(this)}></WrappedRegForm>
        }
      </Modal>
    );

  }
}

export default LoginRegModal;