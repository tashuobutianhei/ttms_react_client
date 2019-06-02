import React from 'react';
import { Form, Icon, Input, Button,Select,DatePicker,Upload } from 'antd';

import 'antd/dist/antd.css'
import  './index.scss'

const { TextArea } = Input;

class RegForm extends React.Component {
    gotoLog(){
        this.props.changeStatus('login')
    }
    render() {

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      
      const { getFieldDecorator } = this.props.form;

      return (
        <Form {...formItemLayout} >
          <Form.Item label="影片名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '写一个名字吧!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="电影的名字"
                style={{ width: '80%' }}
              />,
            )}
          </Form.Item>
          <Form.Item  label="导演">
            {getFieldDecorator('guide', {
              rules: [{ required: true, message: '总得有导演吧' }],
            })(
              <Select mode="tags" 
              placeholder="导演谁啊"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: '80%' }}
              tokenSeparators={[',']}
               >
              </Select>
            )}
          </Form.Item>
          <Form.Item label="主演名单">
            {getFieldDecorator('actor', {
              rules: [{ required: true, message: '主演是谁？？？' }],
            })(
              <Select mode="tags" 
              placeholder="主演谁啊"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: '80%' }}
              
              tokenSeparators={[',']}
               >
              </Select>
            )}
          </Form.Item>
          <Form.Item label="语种">
            {getFieldDecorator('language', {
              rules: [{ required: true, message: '说的啥话！' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="语种"
                style={{ width: '80%' }}
              />,
            )}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('language', {
              rules: [{ required: true, message: '什么类型？' }],
            })(
              <Select mode="tags" 
              placeholder="啥子类型"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              style={{ width: '80%' }}
              tokenSeparators={[',']}
               >
              </Select>
            )}
          </Form.Item>
          <Form.Item label="时长">
            {getFieldDecorator('onlineDate', {
              rules: [{ required: true, message: '时长' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="时长"
                style={{ width: '80%' }}
              />
            )}
          </Form.Item>
          <Form.Item label="上映时间">
            {getFieldDecorator('onlineDate', {
              rules: [{ required: true, message: '啥时候上映' }],
            })(
              <DatePicker  
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="上映时间"
               />
            )}
          </Form.Item>
          <Form.Item label="封面图">
            {getFieldDecorator('img', {
              rules: [{ required: true, message: '啥时候上映' }],
            })(
              <Upload>
              <Button>
                <Icon type="upload" /> Upload
              </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="影片简介">
            {getFieldDecorator('language', {
              rules: [{ required: true, message: '说的是人话吗！' }],
            })(
              <TextArea
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                rows={4}
                style={{ width: '80%' }}
                placeholder="描述一下呗"
              />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              确认添加
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  export default Form.create({ name: 'add_movie' })(RegForm);