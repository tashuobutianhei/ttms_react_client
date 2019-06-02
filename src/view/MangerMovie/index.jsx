import React from 'react';
import {Button, Input,  Row, Col,Radio,Pagination,Tabs,Collapse} from 'antd';


import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import  './index.scss'

import AddMovieForm from '../../component/AddMovieForm/index.jsx'

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Search = Input.Search;



class Rank extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        // let RankList = CONST.rank.rankList;
        // let RankValue =  CONST.rank.rankValue
        let {doing} = CONST.mangerDate.mangerMovie;
        return (
                <div>
                      <Tabs defaultActiveKey="movie_doing" >
                            <TabPane key="movie_doing" tab='线上影片' >
                                <div className="mangerMovie_doing_TabPane">
                                    <Search
                                    placeholder="搜吧！"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                    />
                                    <Collapse accordion className="mangerMovie_doing_Collapse">
                                        {
                                            doing.map((item,index)=>{
                                                return(
                                                    <Panel header={`${++index} ${item.name}`} key={item.index}>
                                                        <Row>
                                                            <Col span={3} className="RankPartItemTop"></Col>
                                                            <Col span={4} className="RankPartItemImg">
                                                                <img src='/img/movie.jpg'></img>
                                                            </Col>
                                                            <Col span={12} className="RankPartItemValue">
                                                                <div>
                                                                    <h1>{item.name}</h1> 
                                                                    <Button type="danger">下线</Button>
                                                                    <p><span>导演：</span><span>{item.guide}</span></p>
                                                                    <p><span>主演:</span><span>{item.actor}</span></p>
                                                                    <p><span>类型：</span><span>{item.type}</span></p>
                                                                    <p><span>语种：</span><span>{item.language}</span></p>
                                                                    <p><span>上映时间：</span><span>{item.onlineTime}</span></p>
                                                                    <p><span>影片描述：</span><span>{item.about}</span></p>
                                                                </div>  
                                                            </Col>
                                                            <Col span={4} className="RankPartItemRank">
                                                            </Col>
                                                        </Row>
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                    <Pagination defaultCurrent={1} total={50} className="mangerMovie_doing_Pagination"/>
                                </div>
                            </TabPane>
                            <TabPane key="movie_done" tab='已下线影片'>
                            <div className="mangerMovie_doing_TabPane">
                                    <Search
                                    placeholder="搜吧！"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                    />
                                    <Collapse accordion className="mangerMovie_doing_Collapse">
                                        {
                                            doing.map((item,index)=>{
                                                return(
                                                    <Panel header={`${++index} ${item.name}`} key={item.index}>
                                                        <Row>
                                                            <Col span={3} className="RankPartItemTop"></Col>
                                                            <Col span={4} className="RankPartItemImg">
                                                                <img src='/img/movie.jpg'></img>
                                                            </Col>
                                                            <Col span={12} className="RankPartItemValue">
                                                                <div>
                                                                    <h1>{item.name}</h1> 
                                                                    <Button type="danger" disabled>已下线</Button>
                                                                    <p><span>导演：</span><span>{item.guide}</span></p>
                                                                    <p><span>主演:</span><span>{item.actor}</span></p>
                                                                    <p><span>类型：</span><span>{item.type}</span></p>
                                                                    <p><span>语种：</span><span>{item.language}</span></p>
                                                                    <p><span>上映时间：</span><span>{item.onlineTime}</span></p>
                                                                    <p><span>下映时间：</span><span>{item.onlineTime}</span></p>
                                                                    <p><span>影片描述：</span><span>{item.about}</span></p>
                                                                </div>  
                                                            </Col>
                                                            <Col span={4} className="RankPartItemRank">
                                                            </Col>
                                                        </Row>
                                                    </Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                    <Pagination defaultCurrent={1} total={50} className="mangerMovie_doing_Pagination"/>
                                </div>
                            </TabPane>
                            <TabPane key="movie_add" tab='增加影片'>
                                <div  className="mangerMovie_movie_add_Form">
                                  <AddMovieForm></AddMovieForm>
                                </div>
                            </TabPane>
                        </Tabs>
                </div>
        );

    }
}

export default Rank;
