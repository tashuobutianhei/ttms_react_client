import { Button, Modal, Form,Select} from 'antd';
import React from 'react';

const { Option } = Select;


const AddPlayForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    
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
            <Form.Item label="拉黑理由" >
              {getFieldDecorator('reason', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
              <Select >
                <Option value="a">理由1</Option>
                <Option value="b">理由2</Option>
                <Option value="c">理由3</Option>
                <Option value="d">理由4</Option>
            </Select>
            )}
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

      this.props.readyBlackHandle({
        ...this.props.userInfo,
        ...values
      })
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button   style={{backgroundColor:'rgb(239,66,56)',color:'white'}}  onClick={this.showModal}>
          拉黑
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
