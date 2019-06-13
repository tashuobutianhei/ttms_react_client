import React from 'react';
import { Form, Icon, Input, Button, Select, DatePicker, Upload,message } from 'antd';
import tool from '../../common/const/tool'

import 'antd/dist/antd.css'
import './index.scss'
import axios from 'axios'
axios.defaults.withCredentials = true

const { TextArea } = Input;
const { Option } = Select;


class addForm extends React.Component {

  state = {
    fileList: [],
    uploading: false,
  }

  addMovie() {
    this.props.addMovie(this.state.fileList);
  }

  render() {
    const sourceInfo = this.props.sourceInfo
    const catInfo = this.props.catInfo
    console.log(catInfo)
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

    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <Form {...formItemLayout} ref="addMovieForm">
        <Form.Item label="影片名称">
          {getFieldDecorator('filmName', {
            rules: [{ required: true, message: '写一个名字吧!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="电影的名字"
              style={{ width: '80%' }}
            />,
          )}
        </Form.Item>
        <Form.Item label="导演">
          {getFieldDecorator('director', {
            rules: [{ required: true, message: '总得有导演吧' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="导演"
              style={{ width: '80%' }}
            />,
          )}
        </Form.Item>
        <Form.Item label="主演名单">
          {getFieldDecorator('actors', {
            rules: [{ required: true, message: '主演是谁？？？' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="主演"
              style={{ width: '80%' }}
            />,
          )}
        </Form.Item>
        <Form.Item label="语种">
          {getFieldDecorator('filmSource', {
            rules: [{ required: true, message: '说的啥话！' }],
          })(
            <Select style={{ width: 120 }}>
              {
                sourceInfo.map(item => {
                  return (
                    <Option value={item.sourceId}>{item.sourceName}</Option>
                  )
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="类型">
          {getFieldDecorator('filmCats', {
            rules: [{ required: true, message: '什么类型？' }],
          })(
            <Select >
              {
                catInfo.map(item => {
                  return (
                    <Option value={`#${item.catId}#`}>{item.catName}</Option>
                  )
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="时长">
          {getFieldDecorator('length', {
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
          {getFieldDecorator('filmTime2', {
            rules: [{ required: true, message: '啥时候上映' }],
          })(
            <DatePicker
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="上映时间"
            />
          )}
        </Form.Item>
        <Form.Item label="封面图">
          {getFieldDecorator('imgAddress', {
            rules: [{ required: true, message: '啥时候上映' }],
          })(
            <div>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Upload
              </Button>
              </Upload>
              {/* {uploading ? 'Uploading' : 'Start Upload'} */}
            </div>
          )}
        </Form.Item>
        <Form.Item label="影片简介">
          {getFieldDecorator('biography', {
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
          <Button type="primary" htmlType="submit" onClick={this.addMovie.bind(this)}>
            确认添加
        </Button>
        </Form.Item>
      </Form>
    );
  }
}
const AddForm = Form.create({ name: 'add_movie' })(addForm);


class addMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceInfo: [],
      catInfo: []
    }
  }
  componentDidMount() {
  }
  componentWillMount() {
    console.log(this.formRef)
    axios({
      url: '/film/getConditionList',
      method: 'get',
    }).then(res => {
      console.log(res)
      this.setState({
        sourceInfo: res.data.data.sourceInfo,
        catInfo: res.data.data.catInfo

      })
    }).catch(err => {

    })
  }
  addMovie(file) {
    console.log(file)
    this.refs.addForm.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        axios({
          url: '/film/add',
          method: 'post',
          headers: { "Content-Type": "multipart/form-data" },
          data: tool.transformData({
            ...values,
            file: file[0],
            filmTime: `${new Date(values.filmTime2).getFullYear()}-${new Date(values.filmTime2).getMonth() + 1}-${new Date(values.filmTime2).getDate()}`
          })
        }).then(res => {
          message.success(res.data.data.msg);
          this.refs.addForm.resetFields();
        }).catch(err => {
          message.error(err);
        })
      } else {

      }
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <AddForm
        ref='addForm'
        catInfo={this.state.catInfo}
        sourceInfo={this.state.sourceInfo}
        wrappedComponentRef={this.saveFormRef}
        addMovie={this.addMovie.bind(this)}></AddForm>
    );
  }
}

export default addMovieForm;