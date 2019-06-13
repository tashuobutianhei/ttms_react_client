import React from 'react';
import { Row, Col,Button,Rate, Icon} from 'antd';
import {  Route, Switch,withRouter } from 'react-router-dom'

import MoiveAbout from '../MovieAbout/index'
import MoiveTime from '../MoiveTime/index'
import MoiveBuy from '../MoiveBuy/index'

import 'antd/dist/antd.css'
import  './index.scss'
import axios from 'axios'
axios.defaults.withCredentials = true


const map = ['value','time'] 

class MovieItem extends React.Component {
    constructor(props) {
        super(props); 
        let match = map.indexOf(this.props.location.pathname.split('/')[3])>-1 ? this.props.location.pathname.split('/')[3] : 'value'; 
        this.state = {
            path:match,
            // movieId:this.props.match.params.movieId
            movieInfo:''
        }
      }
      componentWillMount(){
        
        this.props.history.push(`/MovieItem/${this.props.match.params.movieId}/${this.state.path}`);
        axios({
            url:`/film/films/${this.props.match.params.movieId}?searchType=0`,
            method:'get'
        }).then(res=>{
            this.setState({
                movieInfo:res.data.data
            })
        })

      }
      buttonClickHandle() {
        if(this.state.path === 'value') {
            this.setState({
                path:'time'
            })
            this.props.history.push(`/MovieItem/${this.props.match.params.movieId}/time`)
        } else {
            this.setState({
                path:'value'
            })
            this.props.history.push(`/MovieItem/${this.props.match.params.movieId}/value`)
        }
      }
      
      render() {        
        return ( 
            <div >
              <div className="back">
                <Row className="movieValue" gutter={16}>
                    <Col span={8}>
                        <img src={`http://192.168.1.179:8080/${this.state.movieInfo.imgAddress}`}></img>
                    </Col>
                    <Col span={8} className="movievalue">
                        <div className="movieName2">
                            <p>{this.state.movieInfo.filmName}</p>
                            <p>{this.state.movieInfo.filmEnName}</p>
                            <p>{this.state.movieInfo.info01}</p>
                            <p>{this.state.movieInfo.info02}</p>
                        </div>
                        <div className="buttonGroup">
                            <Row gutter={16}>
                                <Col span={12}><Button className="button"><Icon type="heart" theme="filled" />想看</Button></Col>
                                <Col span={12}><Button className="button"><Icon type="star" theme="filled" />评分</Button></Col>
                                <Col span={24}>
                                    <Button style={{marginTop:'15px'}} className="button buttonBuy" 
                                    onClick={this.buttonClickHandle.bind(this)}>
                                    {this.state.path === 'value'?'选择购票':'影片信息'}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={8} className="movieRate">
                        <div className="nocontent"></div>
                        <div>
                            <p>用户评分{this.state.movieInfo.score}</p>
                            <Rate allowHalf defaultValue={4.5} />
                            <p>1.1亿</p>
                        </div>
                    </Col>
                </Row> 
              </div>
                <Switch>
                    <Route  exact path="/MovieItem/:movieId/value" component={MoiveAbout} ></Route>
                    <Route  exact path="/MovieItem/:movieId/time" component={MoiveTime} ></Route>
                    <Route  exact path="/MovieItem/:movieId/buy/:playKey" component={MoiveBuy} ></Route>
                    {/* <Redirect to='/Home'></Redirect> */}
                </Switch>
            </div>
        );

    }
}

export default withRouter(MovieItem);