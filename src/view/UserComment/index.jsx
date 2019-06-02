import React from 'react';
import { Row, Col,Button} from 'antd';
import CONST from '../../common/const/index'

import MovieComment from '../../component/MovieComment/index.jsx'

import 'antd/dist/antd.css'
import  './index.scss'


class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          blackUserList:CONST.mangerDate.mangerUser.BlackUser
        }
      } 

      render() {
        let {comment} = CONST

        return (
        <div className="Usercomment">
           {
             comment.map((item,index)=>{
              return(
                <div class="commentItem">
                  <Row >
                    <Col span={2} className="button">
                      <Button type="danger">删除</Button>
                    </Col>
                    <Col span={21} >
                      <MovieComment commentValue={item} key={index}></MovieComment>
                    </Col>
                  </Row>   
                </div>                          
                )
              })
            }
        </div>
        );

    }
}

export default Rank;
