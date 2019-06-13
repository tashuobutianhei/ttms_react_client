import React from 'react';
import { Row, Col, Icon, Tabs, Divider } from 'antd';
import { Route, Switch, withRouter } from 'react-router-dom'

import Zmage from 'react-zmage'

import MovieComment from '../../component/MovieComment/index.jsx'
import Actor from '../../component/Actor/index.jsx'
import MovieIt from '../../component/MovieItem'

import CONST from '../../common/const/index'
import 'antd/dist/antd.css'
import './index.scss'

import axios from 'axios'
axios.defaults.withCredentials = true


const TabPane = Tabs.TabPane;



class MovieAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: {}
        }
    }
    componentWillMount() {
        axios({
            url: `/film/films/${this.props.match.params.movieId}?searchType=0`,
            method: 'get'
        }).then(res => {
            this.setState({
                movieInfo: res.data.data
            })
        })

    }
    render() {
        let { comment, actor, img, movie } = CONST
        console.log(this.props)
        return (
            <div >
                <div className="movieContent">
                    <Row >
                        <Col span={14} className="movieSelf">
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="介绍" key="1">
                                    <div className="movieAbout">
                                        <h2><Icon type="notification" />剧情介绍</h2>
                                        <p>{this.state.movieInfo.imgAddress}</p>
                                    </div>
                                    <Divider ></Divider>
                                    <div className="movieComment">
                                        <h2><Icon type="like" />热门评论</h2>
                                        {
                                            comment.map((item, index) => {
                                                return (
                                                    <MovieComment commentValue={item} key={index}></MovieComment>
                                                )
                                            })
                                        }
                                    </div>
                                </TabPane>
                                <TabPane tab="演职人员" key="2">
                                    <div>
                                        <p>导演（{actor.guide.length}）</p>
                                        <Row gutter={42}>
                                            {
                                                actor.guide.map((item, index) => {
                                                    return (
                                                        <Col span={6} key={index}>
                                                            <Actor actor={item} actorType='guide'></Actor>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                    <div>
                                        <p>演员 ({actor.actor.length}）</p>
                                        <Row gutter={42}>
                                            {
                                                actor.actor.map((item, index) => {
                                                    return (
                                                        <Col span={6} key={index}>
                                                            <Actor actor={item} actorType='actor'></Actor>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab="图集" key="3">
                                    <Row gutter={16}>
                                        {
                                            img.map((item, index) => {
                                                return (
                                                    <Col key={index} span={4}>
                                                        <Zmage src="http://zmage.caldis.me/imgSet/childsDream/demo.jpg" style={{ width: '100%', marginTop: '10px' }}>

                                                        </Zmage>
                                                    </Col>
                                                )
                                            })
                                        }

                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={10} className="movieMore">
                            <h2><Icon type="heart" />相关电影</h2>
                            <Row gutter={16}>
                                {
                                    movie.map((item, index) => {
                                        if (index <= 5) {
                                            return (
                                                <Col key={index} span={8}>
                                                    <MovieIt movieValue={item}></MovieIt>
                                                </Col>
                                            )
                                        }
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>

            </div>

        );

    }
}

export default withRouter(MovieAbout);