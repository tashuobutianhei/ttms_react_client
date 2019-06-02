import React from 'react';
import { Row, Col, Icon} from 'antd';
import MovieItem from '../../component/MovieItem/index.jsx';
import {  Route, Switch,withRouter,Redirect } from 'react-router-dom'

import 'antd/dist/antd.css'
import  './index.scss'



class HomePart extends React.Component {
    constructor(props) {
        super(props);
      } 

      gotoAll(){
        this.props.history.push(`/Movie`)
      }
      
      gotoRank(){
        this.props.history.push(`/Rank`)
      }
      render() {
        const date = this.props.movieValue
        const color = {
            doing:'#ef4238',
            done:'#2d98f3',
            will:'#ffb400'
        }
        const Relatvie = {
            doing:{
                color:'#ef4238',
                sidecolor:'#2d98f3',
                title:'佳片热映',
                side:'今日票房',
                el:'万'
            },
            done:{
                color:'#ffb400',
                sidecolor:'#ef4238',
                title:'热门电影',
                side:'热门排行',
                el:'分'
            },
            will:{
                color:'#2d98f3',
                sidecolor:'#ffb400',
                title:'即将上映',
                side:'最受期待',
                el:'想看'

            }
        }
        return (
           <Row gutter={48} >
               <Col span={16}>
                   <Row className="title" type="flex" justify="space-between" style={{color:`${Relatvie[date.status].color}`}}>
                       <Col className="titleFont">{Relatvie[date.status].title}({date.movieDate.length}部)</Col>
                       <Col className="titleAll"><p onClick={this.gotoAll.bind(this)} >全部<Icon type="right" /></p></Col>
                   </Row>
                   <Row gutter={48}>
                       {
                          date.movieDate.map((item,index)=>{
                                return (
                                    <Col span={6}  key={index} style={{marginBottom:'20px'}}>
                                       <MovieItem movieValue={item} ></MovieItem>
                                    </Col>
                                )
                           })
                       }
                   </Row>
               </Col>
               <Col span={8}>
                    <Row className="title" type="flex" justify="space-between" style={{color:`${Relatvie[date.status].color}`}}>
                       <Col className="titleFont">{Relatvie[date.status].side}</Col>
                       <Col className="titleAll"><p onClick={this.gotoRank.bind(this)}>查看完整榜单<Icon type="right" /></p></Col>
                   </Row>
                    <Row>
                    {
                      date.movieList.map((item,index)=>{
                          return (
                            <div ey={index} className="rankP"  style={{color:`${Relatvie[date.status].sidecolor}`}}>
                                <Row>
                                    <Col span={3}>{item.rank}.</Col>
                                    <Col span={16}>{item.name}</Col>
                                    <Col span={5}>{item.name}{Relatvie[date.status].el}</Col>
                                </Row>
                            </div>
                          )
                      }) 
                    }
                    </Row>
                   
               </Col>
           </Row>
        );

    }
}

export default withRouter(HomePart);
