import { Button, Modal, Upload, Icon, message} from 'antd';
import React from 'react';


  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  class AvatarModal extends React.Component {
    state = {
      imageUrl:'',
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
    onOk(){
      this.props.onCreate(this.state.imageUrl)
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const imageUrl = this.state.imageUrl;

      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传</div>
        </div>
      );

      return (
        <Modal
          visible={visible}
          title="修改头像"
          okText="完成"
          cancelText="取消"
          onCancel={onCancel}
          onOk={this.onOk.bind(this)}
        >
          <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
        </Modal>
      );
    }
  }


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
      this.setState({ visible: false });
      this.props.ChangeAvatar(e)
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
        <AvatarModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate.bind(this)} 
        />
      </div>
    );
  }
}


export default AddPlayModal;
