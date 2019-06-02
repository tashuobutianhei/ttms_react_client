import { Button, Modal, Form} from 'antd';
import React from 'react';


import './index.scss'

const AddPlayForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props){
      super(props);

      let row=this.props.roomInfo.row
      let col=this.props.roomInfo.col;

      // let seat=[];

      // for(let i = 0;i<row*col;i++){
      //   seat.push('1');
      // }
      this.state = {
        seat:this.props.roomInfo.seat
      }
    }
    seatClickHandle(index){
      let midarray = this.state.seat
      if(this.state.seat[index] === '1') {
        midarray[index] = '0';
      } else {
        midarray[index] = '1';
      }
      this.setState({
        seat:midarray
      })
    }
    onCreate(){
      this.props.onCreate(this.state.seat)
    }
    render() {
      const { visible, onCancel, onCreate } = this.props;

      let row=this.props.roomInfo.row
      let col=this.props.roomInfo.col;

      let flex_basise = (100/col);
      return (
        <Modal
          visible={visible}
          title="增加演出厅"
          okText="确认增加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={this.onCreate.bind(this)}
        >
          <div className="MangerSeatBody">
            {
              this.state.seat.map( (item,index) =>{
                return(
                  <div className="MangerItSeat" style={{flexBasis:`${flex_basise}%`}} key={index}>
                      {
                      item == '0' ? <img src='/img/empty.png' alt="img" onClick={this.seatClickHandle.bind(this,index)} ></img> :''
                      }
                      {
                      item == '1' ? <img src='/img/ready.png' alt="img" onClick={this.seatClickHandle.bind(this,index)}></img> :''
                      }
                  </div>
                )
              })
            }
          </div>
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

  handleCreate = (e) => {
    this.props.desigonOk({
      ...this.props.roomInfo,
      seat:e
    })
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          设计
        </Button>
        <AddPlayForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}

          onCancel={this.handleCancel}
          onCreate={this.handleCreate.bind(this)}

          roomInfo={this.props.roomInfo}
        />
      </div>
    );
  }
}


export default AddPlayModal;
