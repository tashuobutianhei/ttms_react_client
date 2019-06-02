import React from 'react';
import { Row, Col} from 'antd';
import RankPartItem from '../../component/RankPartItem/index.jsx';

import 'antd/dist/antd.css'
import  './index.scss'


class RankePart extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        let rankValue = this.props.RankList
        return (
           <div className="rankPartContent">
               <div className="rankPartFont">
                   <p><span>更新时间：</span><span>2019-5-26</span></p>
                   <p>榜单规则：将昨日国内热映的影片，按照评分从高到低排列取前10名，每天上午10点更新。</p>
               </div>
               <div>
                   {
                       rankValue.map((item)=>{
                           return (
                            <div className="RankPartItem" >
                                <RankPartItem rankValue={item}></RankPartItem>
                            </div>
                           )
                       })
                   }
               </div>
           </div>
        );

    }
}

export default RankePart;
