import React from 'react';
import { Button, Input, Row, Col, Radio, Pagination, Tabs, Collapse } from 'antd';


import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import './index.scss'

import AddMovieForm from '../../component/AddMovieForm/index.jsx'

import axios from 'axios'

import tool from '../../common/const/tool'

axios.defaults.withCredentials = true

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Search = Input.Search;



class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            total: 0,
            movieList: [],
            movieDownList:[]
        }
    }
    downMovie(e){
        axios({
            url:'/film/offline',
            method:'post',
            headers: { "Content-Type": "multipart/form-data" },
            data:tool.transformData({
                filmId:e
            })
        }).then(res => {

        }).catch(err => {

        })
    }
    getMovieList(e) {
        axios({
            url: '/film/getFilms',
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                showType: 1,
                nowPage: this.state.current
            })
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                total: res.data.data.totalPage,
                movieList: res.data.data.filmInfo
            })

        })
    }
    getMovieListDown(e){
        axios({
            url: '/film/getFilms',
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                showType: 3,
                nowPage: this.state.current
            })
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                total: res.data.data.totalPage,
                movieDownList: res.data.data.filmInfo
            })

        })
    }
    componentWillMount() {
        this.getMovieList()
        this.getMovieListDown()
    }
    render() {
        // let RankList = CONST.rank.rankList;
        // let RankValue =  CONST.rank.rankValue
        let { doing } = CONST.mangerDate.mangerMovie;
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
                                    this.state.movieList.map((item, index) => {
                                        return (
                                            <Panel header={`${item.filmId} ${item.filmName}`} key={item.filmId}>
                                                <Row>
                                                    <Col span={3} className="RankPartItemTop"></Col>
                                                    <Col span={4} className="RankPartItemImg">
                                                        <img src={`http://192.168.1.179:8080/${item.imgAddress}`}></img>
                                                    </Col>
                                                    <Col span={12} className="RankPartItemValue">
                                                        <div>
                                                            <h1>{item.filmName}</h1>
                                                            <Button type="danger" onClick={this.downMovie.bind(this,item.filmId)}>下线</Button>
                                                            {/* <p><span>导演：</span><span>{item.guide}</span></p> */}
                                                            {/* <p><span>主演:</span><span>{item.actor}</span></p> */}
                                                            <p><span>类型：</span><span>{item.filmType}</span></p>
                                                            {/* <p><span>语种：</span><span>{item.language}</span></p> */}
                                                            <p><span>上映时间：</span><span>{item.showTime}</span></p>
                                                            {/* <p><span>影片描述：</span><span>{item.about}</span></p> */}
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
                            <Pagination onChange={this.getMovieList.bind(this)}
                                current={this.state.current}
                                defaultCurrent={1}
                                total={this.state.total}
                                className="mangerMovie_doing_Pagination" />
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
                                    this.state.movieDownList.map((item, index) => {
                                        return (
                                            <Panel header={`${item.filmId}} ${item.filmName}`} key={item.filmName}>
                                                <Row>
                                                    <Col span={3} className="RankPartItemTop"></Col>
                                                    <Col span={4} className="RankPartItemImg">
                                                        <img src={`http://192.168.1.179:8080/${item.imgAddress}`}></img>
                                                    </Col>
                                                    <Col span={12} className="RankPartItemValue">
                                                        <div>
                                                            <h1>{item.filmName}</h1>
                                                            <Button type="danger" disabled>已下线</Button>
                                                            {/* <p><span>导演：</span><span>{item.guide}</span></p> */}
                                                            {/* <p><span>主演:</span><span>{item.actor}</span></p> */}
                                                            <p><span>类型：</span><span>{item.filmType}</span></p>
                                                            {/* <p><span>语种：</span><span>{item.language}</span></p> */}
                                                            {/* <p><span>上映时间：</span><span>{item.onlineTime}</span></p>
                                                            <p><span>下映时间：</span><span>{item.onlineTime}</span></p> */}
                                                            {/* <p><span>影片描述：</span><span>{item.about}</span></p> */}
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
                            <Pagination defaultCurrent={1} total={50} className="mangerMovie_doing_Pagination" />
                        </div>
                    </TabPane>
                    <TabPane key="movie_add" tab='增加影片'>
                        <div className="mangerMovie_movie_add_Form">
                            <AddMovieForm></AddMovieForm>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );

    }
}

export default Rank;
