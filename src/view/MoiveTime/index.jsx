import React from 'react';
import { Row, Col,Button,Divider,Radio,Table} from 'antd';
import { withRouter } from 'react-router-dom'

import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'

const { Column } = Table;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class MovieTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
       
        }
      } 
      BuyButtonHandle(playKey){
        this.props.history.push(`/MovieItem/${this.props.match.params.movieId}/buy/${playKey}`)
      }
      formDate(date){
        return `${date.getMonth()}月${date.getDate()}日`
      }
      formDateKey(date){
        return `${date.getMonth()}_${date.getDate()}`
      }
      getDates(timeall){
        let timeArray = []
        for(let i = 0; i<3 ;i++){
            let needDate = new Date(timeall+86400000*i);
            let time = needDate.getTime()
            timeArray.push({
                time:time,
                date:this.formDate(needDate),
                timeKey:this.formDateKey(needDate)
            })
        }
        return timeArray
      }
      render() {
        let  tableSource  = CONST.table;

        let timeall = new Date().getTime();
        let timeArray = this.getDates(timeall);
        return (
            <div className="choiceTimeContent">
              <Divider></Divider>
              <Row className="choiceTime">
                    <Col span={2}><span>观影时间:</span></Col>
                    <Col span={22}>
                        <RadioGroup defaultValue={this.formDateKey(new Date())}  buttonStyle="solid">
                            {
                                timeArray.map(item=>{
                                    return(
                                       <RadioButton  size="large" buttonStyle="solid" key={item.timeKey} value={item.timeKey}>{item.date}</RadioButton>
                                    )
                                })
                            }
                            </RadioGroup>
                          </Col>
                </Row>
                <div className="table">
                    <Table dataSource={tableSource} >
                        <Column title="放映时间" dataIndex="time" key="time" align="center"/>
                        <Column title="语言" dataIndex="language" key="language" align="center"/>
                        <Column title="放映厅" dataIndex="room" key="room" align="center"/>
                        <Column title="票价" dataIndex="money" key="money"align="center" />
                        <Column
                            title="选座购票"
                            dataIndex="buy"
                            align="center"
                            key="buy"
                            render={(text, record, index) => (
                                <Button  style={{backgroundColor:'rgb(239,66,56)',color:'white'}}
                                onClick={this.BuyButtonHandle.bind(this,record.playKey)}
                                >购票{text}</Button>
                            )}
                            />
                    </Table>;
                </div>
            </div>
            
        );

    }
}

export default withRouter(MovieTime);