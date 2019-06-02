import { Button, Modal, Form, Input,Select} from 'antd';
import React from 'react';


const AddPlayForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
    
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
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
      
      return (
        <Modal
          visible={visible}
          title="拉黑操作"
          okText="确认增加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="原密码" >
              {getFieldDecorator('beforePassword', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input.Password placeholder="验证身份" />)}
            </Form.Item>
          </Form>
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="原密码" >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input.Password placeholder="新密码" />)}
            </Form.Item>
          </Form>
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="再一次" >
              {getFieldDecorator('passwordAgain', {
                rules: [
                  { required: true, message: 'Please input the title of collection!' },{
                    validator:this.compareToFirstPassword}],
              })(<Input.Password placeholder="再输入一次" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class AddPlayModal extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });

      this.props.changePassword(values.password)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button   style={{backgroundColor:'rgb(239,66,56)',color:'white'}}  onClick={this.showModal}>
          修改
        </Button>
        <AddPlayForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        
          
        />
      </div>
    );
  }
}


export default AddPlayModal;
