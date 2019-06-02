import React from 'react';
import { Row, Col,Steps,Tag} from 'antd';
import { withRouter } from 'react-router-dom'

import CONST from '../../common/const/index'
import Seat from '../../component/Seat/index'

import 'antd/dist/antd.css'
import  './index.scss'
import { Button } from 'antd/lib/radio';

const Step = Steps.Step;

class MovieBuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket:[]
        }
      } 
      transform(row,col,index){
        // index++;
         //row
         //col

        return {
            row:Math.round(index/col),
            col:(index%col)+1,
            index:index
        }
      }
      changeSeatStatusHandle(e) {
          let ticketArray = this.state.ticket;
          if(e.action == 'add') {
            ticketArray.push(e.value);
          } else {
            ticketArray =  ticketArray.filter((item,index,array) => {
                return  !(item.index == e.value.index)
              })
          }
          this.setState({
              ticket:ticketArray
          })
      }
      render() {
        let {seat,row,col} = CONST.room;
        
        let flex_basise = (100/col);
   

        return (
            <div className="movieBuyContent">
                <div className="step">
                    <Steps current={1} size="small">
                        <Step title="选择电影场次" />
                        <Step title="选择座次" />
                        <Step title="付款" />
                        <Step title="影院取票" />
                    </Steps>
                </div>
                <div className="MovieBuySeat">
                    <Row>
                        <Col className="seatLeft" span={16}>
                            <div className="seatAll">
                                <div className="seatHeader">
                                    <Row className="seatRow">
                                        <Col span={8}>
                                            <img src="/img/empty.png" className="seatItem"></img>
                                            <span>可选座位</span>
                                        </Col>
                                        <Col span={8}>
                                            <img src="/img/done.png" className="seatItem"></img>
                                            <span>已售座位</span>
                                        </Col>
                                        <Col span={8}>
                                            <img src="/img/ready.png" className="seatItem"></img>
                                            <span>已选座位</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="seatMovie">
                                    <div></div>
                                    <span>屏幕中央</span>
                                </div>
                                <div className="seatBody">
                                    {
                                        seat.split(',').map((item,index)=>{
                                            return(
                                                <div className="ItSeat" style={{flexBasis:`${flex_basise}%`}}>
                                                    <Seat seatStatus={item} changeSeatStatus={this.changeSeatStatusHandle.bind(this)} seatValue={this.transform(row,col,index)}></Seat>
                                                </div>
                                            )
                                        }) 
                                    }
                                </div>
                            </div>

                        </Col>
                        <Col className="seatRight" span={8}>
                            <div className="seatRight1">
                                <Row>
                                    <Col span={10}>
                                        <img src="/img/movie.jpg"></img>
                                    </Col>
                                    <Col span={10}>
                                        <p style={{fontSize:'25px'}}>XXXXX</p>
                                        <p><span>类型:</span>XXXXX</p>
                                        <p><span>时长:</span>XXXXX</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="seatRight2">
                                        <p><span>影院：</span>XXXXX</p>
                                        <p><span>影厅：</span>XXXXX</p>
                                        <p><span>语言：</span>XXXXX</p>
                                        <p><span>场次：</span>XXXXX</p>
                                        <p><span>票价：</span>XXXXX</p>
                            </div>
                            <div className="seatRight3">
                                <div>
                                    <span>座位：</span>
                                    <div style={{height:'50px'}}>
                                    {
                                         this.state.ticket.length > 0 ? '' :<p>点击左侧进行选座吧</p>
                                    }
                                    {
                                        this.state.ticket.map((item,index)=>{
                                            return(
                                                <Tag key={item.index} color="volcano">{`${item.row}排${item.col}座`}</Tag>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                <p>总价：<span>￥{this.state.ticket.length*37}</span></p>
                            </div>
                            <div className="seatRight4">
                                <Button>确认购票</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            
        );

    }
}

export default withRouter(MovieBuy);