import { Button, Modal, Form, Input, Select,Rate} from 'antd';
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
            <Form.Item label="评分" >
              {getFieldDecorator('rank', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Rate allowHalf  />
            )}
            </Form.Item>
            <Form.Item label="评论" >
              {getFieldDecorator('talk', {
               
              })(
                <Input.TextArea rows={4} />
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

      this.props.readyRank(values)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button   type="primary"  onClick={this.showModal}>
          评价
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
