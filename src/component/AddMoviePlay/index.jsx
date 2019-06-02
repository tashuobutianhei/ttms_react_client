import { Button, Modal, Form, Input ,TimePicker,DatePicker} from 'antd';
import React from 'react';

import moment from 'moment';

const AddPlayForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    startTimeChange(time,timeString){
        let endTimeDate = new Date(time._d).getTime()+this.props.timeLong*60*1000;
     
        let endTime= `${new Date(endTimeDate).getHours()}:${new Date(endTimeDate).getMinutes()}`
        this.props.form.setFieldsValue({
            endTime: moment(endTime,'HH:mm'),
        });
    }
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
          title="增加排片"
          okText="确认增加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="开始时间" >
              {getFieldDecorator('date',{
                  initialValue:moment(`${this.props.DateValue.split('_')[0]}/${this.props.DateValue.split('_')[1]}`, 'MM/DD')
              })(<DatePicker disabled />
              )}
            </Form.Item>
            <Form.Item label="开始时间" >
              {getFieldDecorator('startTime', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<TimePicker format='HH:mm'  
              onChange={this.startTimeChange.bind(this)}/>
              )}
            </Form.Item>
            <Form.Item label="结束时间" >
              {getFieldDecorator('endTime')(<TimePicker format='HH:mm' disabled/>)}
            </Form.Item>
            <Form.Item label="票价" >
              {getFieldDecorator('ticket', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input  />)}
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
      // console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      this.props.onReady({...values,date:this.props.DateValue})
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          增加排片
        </Button>
        <AddPlayForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          DateValue={this.props.DateValue}
          timeLong={this.props.timeLong}
        />
      </div>
    );
  }
}


export default AddPlayModal;
