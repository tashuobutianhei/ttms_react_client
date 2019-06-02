import React from 'react';
import {   Row, Col,Radio,Pagination} from 'antd';
import MoiveChoice from '../../component/MovieChoice/index.jsx'
import MovieItem from '../../component/MovieItem/index.jsx'
import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class Movie extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        let _switchData = CONST.choice;
        let _MovieData = CONST.movie;
        return (
                <div className="MovieContent">
                    <div className="Moviewhich">
                      <RadioGroup defaultValue="doing" size="large">
                        <RadioButton value="doing">正在热映</RadioButton>
                        <RadioButton value="will">即将上映</RadioButton>
                        <RadioButton value="done">经典影片</RadioButton>
                      </RadioGroup>
                    </div>
                    <div className="Moviechoice">
                      {
                        _switchData.map((item)=>{
                            return (
                              <div key={item.value} className="chocieItem">
                                   <MoiveChoice chocieValue={item} ></MoiveChoice>
                              </div>
                            )
                        })
                      }
                    </div>
                    <div className="Moviepaixu">
                      <RadioGroup defaultValue="time">
                        <Radio value='time'>按时间排序</Radio>
                        <Radio value='hot'>按热门排序</Radio>
                        <Radio value='talk'>按评论排序</Radio>
                      </RadioGroup>
                    </div>
                    <div className="MoiveAll">
                      <Row gutter={40}>
                        {
                          _MovieData.map(item=>{
                            return (
                              <Col key={item.id} span={4} className="MovieItem">
                                <MovieItem movieValue={item}></MovieItem>
                              </Col>
                            )
                          })
                        }
                      </Row>
                    </div>
                    
                    <Pagination defaultCurrent={6} total={500} className="Moviecount"/>

                </div>
        );

    }
}

export default Movie;
