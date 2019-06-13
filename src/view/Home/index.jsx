import React from 'react';
import { Carousel, AutoComplete, } from 'antd';

import HomePart from '../../component/HomePart/index.jsx';


import CONST from '../../common/const/index.js'
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.scss'

axios.defaults.withCredentials = true



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AllInfo: [],
            Doing: [],
            Will: [],
            Rank: [],
            top:[]
        }
    }
    componentWillMount() {
        axios({
            url: '/film/getIndex',
            method: 'get'
        }).then(res => {
            this.setState({
                AllInfo: res.data.data.banners,
                Doing: res.data.data.hotFilms.filmInfo,
                Will: res.data.data.soonFilms.filmInfo,
                Rank: res.data.data.boxRanking,
                top: res.data.data.top100
            })
        }).catch(err => { })
    }
    render() {
        const _date = CONST.homeDate
        return (

            <div className="contentAll">
                <AutoComplete
                    className="autocom"
                    style={{ width: 200 }}
                    placeholder="这一刻，去找你想要的吧"
                />
                <Carousel effect="fade">
                    {
                        this.state.AllInfo.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={`http://192.168.1.179:8080/${item.bannerAddress}`}></img>
                                </div>
                            )
                        })
                    }
                </Carousel>
                <div className="part">
                    <div className="partItem">
                        <HomePart movieValue={this.state.Doing} top={this.state.top} status="doing"></HomePart>
                    </div>
                    <div className="partItem">
                        <HomePart movieValue={this.state.Will} top={this.state.top} status="will"></HomePart>
                    </div>
                    <div className="partItem">
                        <HomePart movieValue={this.state.Rank} top={this.state.top} status="done"></HomePart>
                    </div>
                    {/* {_date.map((item, index) => {
                        return (
                            <div className="partItem" key={index} >
                                <HomePart movieValue={item} ></HomePart>
                            </div>
                        )
                    })} */}
                </div>
            </div>
        );

    }
}

export default Home;
