import React from 'react';
import {  Row, Col,Radio} from 'antd';

import 'antd/dist/antd.css'
import  './index.scss'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class MovieChoice extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        let _date = this.props.chocieValue
        return (
                    <div className="choiceContent">
                      <Row>
                          <Col span={1}><span>{_date.name}:</span></Col>
                          <Col span={22}>
                            <RadioGroup defaultValue="all"  buttonStyle="solid">
                                <RadioButton value='all' >全部</RadioButton>
                                {
                                    _date.case.map(item=>{
                                        return(
                                            <RadioButton value={item.value} size="large" buttonStyle="solid">{item.name}</RadioButton>
                                        )
                                    })
                                }
                            </RadioGroup>
                          </Col>
                      </Row>
                      
                    </div>
        );

    }
}

export default MovieChoice;