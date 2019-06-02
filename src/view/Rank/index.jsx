import React from 'react';
import {   Row, Col,Radio,Pagination,Tabs} from 'antd';
import RankPart from '../../component/RankPart/index.jsx'
import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'


const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class Rank extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        let RankList = CONST.rank.rankList;
        let RankValue =  CONST.rank.rankValue
        return (
                <div>
                      <Tabs defaultActiveKey="rank_doing" >
                            {
                                RankList.map(item =>{
                                    return (
                                        <TabPane key={item.value} tab={item.name} >
                                           <RankPart RankList={RankValue[item.value]}></RankPart>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                </div>
        );

    }
}

export default Rank;
