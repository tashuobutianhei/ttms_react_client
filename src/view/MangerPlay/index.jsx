import React from 'react';
import { Row, Col, Radio, Pagination, Tabs, Button, Collapse, Input, Table, message } from 'antd';
import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import './index.scss'

import AddPlayModal from '../../component/AddMoviePlay'
import axios from 'axios'

import tool from '../../common/const/tool'

axios.defaults.withCredentials = true

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group
const Panel = Collapse.Panel;
const Search = Input.Search;
const { Column } = Table;

class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: [],
            Dataradio: this.formDateKey(new Date()),
            TableData: [],
            movieList: [],
            movieDownList: [],
            moviePlayList: {}
        }
    }
    componentWillMount() {
        this.getMovieList();
        this.getMovieListDown()
    }
    getMovieList(e) {
        axios({
            url: '/film/getFilms',
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                showType: 1,
            })
        }).then(res => {
            console.log(res.data.data)
            let midArray = this.state.movieList;
            res.data.data.filmInfo.forEach(item => {
                midArray.push(item)
            })
            this.setState({
                // total: res.data.data.totalPage,
                movieList: midArray
            })

        })
    }
    getMovieListDown(e) {
        axios({
            url: '/film/getFilms',
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                showType: 2,
            })
        }).then(res => {
            console.log(res.data.data)
            let midArray = this.state.movieList;
            res.data.data.filmInfo.forEach(item => {
                midArray.push(item)
            })
            this.setState({
                // total: res.data.data.totalPage,
                movieList: midArray
            })

        })
    }
    getplayList(id) {
        axios({
            url: '/cinema/get3DayField',
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                filmId: id,
            })
        }).then(res => {
            this.setState({
                moviePlayList: this.transformDataTo(res.data.data)
            })
        })
    }
    transformDataTo(obj) {
        let newobj = {}
        Object.keys(obj).forEach(item => {
            let midarray = obj[item];
            midarray.forEach((item, index, array) => {
                let newTime = ''
                newTime = new Date(Number(item.beginTime)).getHours() + ':' + new Date(Number(item.beginTime)).getMinutes()
                array[index].beginTime = newTime
            })
            newobj[item] = midarray
        })
        return newobj
    }
    ondeleteClick(e) {
        //   console.log(e);
    }
    onDataRadioChange(e) {
        this.setState({ Dataradio: e.target.value }, () => {
            this.filterTableData(this.state.Dataradio)
        });
    }
    ononReadyAdd(e) {
        console.log(e);
        let midArray = this.state.playList;
        midArray.push({
            id: '1',
            startTime: e.startTime._i,
            endTime: e.endTime._i,
            money: e.ticket,
            room: e.hall.split('_')[1],
            date: e.date
        });
        this.setState({
            playList: midArray
        })
        // console.log(this.state.playList);

        this.filterTableData(this.state.Dataradio);

        axios({
            method: 'post',
            url: '/cinema/addField',
            headers: { "Content-Type": "multipart/form-data" },
            data: tool.transformData({
                beginTime: new Date(e.startTime._d).getTime(),
                endTime: new Date(e.endTime._d).getTime(),
                hallId: e.hall.split('_')[0],
                hallName: e.hall.split('_')[1],
                price: e.ticket,
                filmId: e.filmId
            })
        }).then(res => {
            message.success(res.data.msg)
        }).catch(err => {
            message.error(err)
        })
    }
    filterTableData(Dataradio) {
        this.setState({
            TableData: this.state.playList.filter((item) => {

                return item.date == Dataradio
            })
        })
    }
    formDate(date) {
        return `${date.getMonth() + 1}月${date.getDate()}日`
    }
    formDateKey(date) {
        return `${date.getMonth() + 1}_${date.getDate()}`
    }
    getDates(timeall) {
        let timeArray = []
        for (let i = 0; i < 3; i++) {
            let needDate = new Date(timeall + 86400000 * i);
            let time = needDate.getTime()
            timeArray.push({
                time: time,
                date: this.formDate(needDate),
                timeKey: this.formDateKey(needDate)
            })
        }
        return timeArray
    }
    render() {
        let { doing } = CONST.mangerDate.mangerMovie;


        let timeall = new Date().getTime();
        let timeArray = this.getDates(timeall);
        return (
            <div>

                <Tabs defaultActiveKey="play" >
                    <TabPane key='play' tab='线上电影列表' >
                        <div className="mangerMovie_doing_TabPane">
                            <Search
                                placeholder="搜吧！"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }} />
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
                                                    <Col span={12} className="MoviePlay_RankPartItemValue">
                                                        <div className="MoviePlay_RankPartItemValueDiv">
                                                            <h1>{item.filmName}</h1>
                                                            {/* <p><span>导演：</span><span>{item.guide}</span></p>
                                                            <p><span>主演:</span><span>{item.actor}</span></p> */}
                                                            <p><span>类型：</span><span>{item.filmType}</span></p>
                                                            {/* <p><span>语种：</span><span>{item.language}</span></p>
                                                            <p><span>时长</span><span>{item.time}</span></p>
                                                            <p><span>上映时间：</span><span>{item.onlineTime}</span></p>
                                                            <p><span>影片描述：</span><span>{item.about}</span></p> */}
                                                        </div>
                                                        <Row>
                                                            <Col span={12}>
                                                                <RadioGroup value={this.state.Dataradio} buttonStyle="solid" onChange={this.onDataRadioChange.bind(this)}>
                                                                    {
                                                                        timeArray.map(item => {
                                                                            return (
                                                                                <RadioButton size="large" buttonStyle="solid" key={item.timeKey} value={item.timeKey}>{item.date}</RadioButton>
                                                                            )
                                                                        })
                                                                    }
                                                                </RadioGroup>
                                                            </Col>
                                                            <Col span={12}><AddPlayModal
                                                                DateValue={this.state.Dataradio}
                                                                timeLong={item.filmLength}
                                                                filmId={item.filmId}
                                                                onReady={this.ononReadyAdd.bind(this)}
                                                            ></AddPlayModal></Col>
                                                        </Row>


                                                        <Table dataSource={this.state.TableData} >
                                                            <Column title="排片id" dataIndex="id" key="id" align="center" />
                                                            <Column title="开始时间" dataIndex="startTime" key="startTime" align="center" />
                                                            <Column title="结束时间" dataIndex="endTime" key="endTime" align="center" />
                                                            <Column title="票价" dataIndex="money" key="money" align="center" />
                                                            <Column title="演出厅" dataIndex="room" key="room" align="center" />

                                                            <Column
                                                                title="操作"
                                                                dataIndex="buy"
                                                                align="center"
                                                                key="buy"
                                                                render={(text, record, index) => (
                                                                    <Button
                                                                        style={{ backgroundColor: 'rgb(239,66,56)', color: 'white' }}
                                                                        onClick={this.ondeleteClick.bind(this, record)}
                                                                    >删除排片{text}</Button>
                                                                )} />
                                                        </Table>
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
                </Tabs>
            </div>
        );

    }
}

export default Rank;
