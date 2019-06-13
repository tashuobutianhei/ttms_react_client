import React from 'react';
import { Row, Col, Button, Divider, Radio, Table } from 'antd';
import { withRouter } from 'react-router-dom'

import CONST from '../../common/const/index'

import 'antd/dist/antd.css'
import './index.scss'
import tool from '../../common/const/tool'


import axios from 'axios'
axios.defaults.withCredentials = true

const { Column } = Table;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class MovieTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableSource: [],
      moviePlayList: {}
    }
  }
  componentWillMount() {
    axios({
      url: '/cinema/get3DayField',
      method: 'post',
      headers: { "Content-Type": "multipart/form-data" },
      data: tool.transformData({
        filmId: this.props.match.params.movieId,
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
  BuyButtonHandle(playKey) {
    this.props.history.push(`/MovieItem/${this.props.match.params.movieId}/buy/${playKey.id}?price=${playKey.price}`)
  }
  formDate(date) {
    return `${date.getMonth()}月${date.getDate()}日`
  }
  formDateKey(date) {
    return `${date.getMonth()}_${date.getDate()}`
  }
  getDates(timeall) {
    let timeArray = []
    let stringNumber = ['one', 'two', 'three'];
    for (let i = 0; i < 3; i++) {
      let needDate = new Date(timeall + 86400000 * i);
      let time = needDate.getTime()
      timeArray.push({
        time: time,
        date: this.formDate(needDate),
        timeKey: this.formDateKey(needDate),
        stringNumber: stringNumber[i]
      })
    }
    return timeArray
  }
  // checknumber(ch) {
  //   console.log(ch.length)
  //   for (let i = 0; i < ch.length; i++) {
  //     if ('0' <= ch && ch <= '9') {

  //     } else {
  //       return false
  //     }
  //   }
  //   return true
  // }
  radioChange(e) {

    this.setState({
      tableSource: this.state.moviePlayList[e.target.value]
    })
  }
  render() {
    // let tableSource = CONST.table;

    let timeall = new Date().getTime();
    let timeArray = this.getDates(timeall);
    return (
      <div className="choiceTimeContent">
        <Divider></Divider>
        <Row className="choiceTime">
          <Col span={2}><span>观影时间:</span></Col>
          <Col span={22}>
            <RadioGroup buttonStyle="solid" onChange={this.radioChange.bind(this)}>
              {
                timeArray.map(item => {
                  return (
                    <RadioButton size="large" buttonStyle="solid" key={item.timeKey} value={item.stringNumber}>{item.date}</RadioButton>
                  )
                })
              }
            </RadioGroup>
          </Col>
        </Row>
        <div className="table">
          <Table dataSource={this.state.tableSource} >
            <Column title="放映时间" dataIndex="beginTime" key="beginTime" align="center" />
            <Column title="语言" dataIndex="language" key="language" align="center" />
            <Column title="放映厅" dataIndex="hallString" key="hallString" align="center" />
            <Column title="票价" dataIndex="price" key="price" align="center" />
            <Column
              title="选座购票"
              dataIndex="buy"
              align="center"
              key="buy"
              render={(text, record, index) => (
                <Button style={{ backgroundColor: 'rgb(239,66,56)', color: 'white' }}
                  onClick={this.BuyButtonHandle.bind(this, record)}
                >购票{text}</Button>
              )}
            />
          </Table>;
                </div>
      </div>

    );

  }
}

export default withRouter(MovieTime);