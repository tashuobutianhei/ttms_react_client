import React from 'react';
import { Row, Col} from 'antd';
import 'antd/dist/antd.css'
import  './index.scss'




class RankPartItem extends React.Component {
    constructor(props) {
        super(props);

      } 
 
      render() {
        let rankValue = this.props.rankValue;
        return (
            <div className="RankPartItemContent">
               <Row>
                 <Col span={4} className="RankPartItemTop"><div>1</div></Col>
                 <Col span={4} className="RankPartItemImg">
                    <img src='/img/movie.jpg'></img>
                 </Col>
                 <Col span={12} className="RankPartItemValue">
                    <div>
                      <h1>{rankValue.name}</h1>
                      <p><span>主演：</span><span>xxxx</span></p>
                      <p><span>上映时间</span><span>xxxx</span></p>
                    </div>
                 </Col>
                 <Col span={4} className="RankPartItemRank">
                   <div>
                      <p>9.5</p>
                   </div>  
                 </Col>
               </Row>
            </div>
            
        );

    }
}

export default RankPartItem;