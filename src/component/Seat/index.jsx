import React from 'react';

import 'antd/dist/antd.css'
import  './index.scss'




class Actor extends React.Component {
    constructor(props) {
        super(props);

        let status = ''

        switch(this.props.seatStatus){
          case '1': status = 'empty' ;break;
          case '0': status = 'done' ;break;
          case '2': status = 'ready' ;break;
        }

        this.state = {
          status:status
        }
      } 
      seatClickHandle(status) {
        if(status == this.state.status){
          //重复点击无效
          if(status == 'empty') {
            this.setState({
              status:'ready'
            })
          } else {
            this.setState({
              status:'empty'
            })
          }
          //add&red
          this.props.changeSeatStatus({
            action:this.state.status == 'ready' ? 'red' : 'add',
            value:this.props.seatValue
          })
        }
      }
      render() {
        return (
            <div className="Seat">
              {
               this.state.status == 'empty' ? <img src='/img/empty.png' alt="img" onClick={this.seatClickHandle.bind(this,'empty')} ></img> :''
              }
              {
               this.state.status == 'done' ? <img src='/img/done.png' alt="img" ></img> :''
              }
              {
               this.state.status == 'ready' ? <img src='/img/ready.png' alt="img" onClick={this.seatClickHandle.bind(this,'ready')}></img> :''
              }
            </div>
        );

    }
}

export default Actor;