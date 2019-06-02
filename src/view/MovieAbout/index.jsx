import React from 'react';
import { Row, Col, Icon,Tabs,Divider} from 'antd';
import Zmage from 'react-zmage'

import MovieComment from '../../component/MovieComment/index.jsx'
import Actor from '../../component/Actor/index.jsx'
import MovieIt from '../../component/MovieItem'

import CONST from '../../common/const/index'
import 'antd/dist/antd.css'
import  './index.scss'

const TabPane = Tabs.TabPane;



class MovieAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
       
        }
      } 
      
      render() {
        let {comment,actor,img,movie } = CONST

        return (
            <div >
              <div className="movieContent">
                  <Row >
                      <Col span = {14} className="movieSelf">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="介绍" key="1">
                                <div className="movieAbout">
                                    <h2><Icon type="notification" />剧情介绍</h2>
                                    <p>自纽约事件以来，托尼·斯塔克（小罗伯特·唐尼 饰）为前所未有的焦虑症所困扰。他疯狂投入钢铁侠升级版的研发，为此废寝忘食，甚至忽略了女友佩珀·波茨（格温妮斯·帕特洛 饰）的感受。与此同时，臭名昭著的恐怖头目曼达林（本·金斯利 饰）制造了一连串的爆炸袭击事件，托尼当年最忠诚的保镖即在最近的一次袭击中身负重伤。未过多久，托尼、佩珀以及曾与他有过一面之缘的女植物学家玛雅（丽贝卡·豪尔 饰）在家中遭到猛烈的炮火袭击，几乎丧命，而这一切似乎都与22年前那名偶然邂逅的科学家阿尔德里奇·基连（盖·皮尔斯饰）及其终极生物的研究有关。即使有精密先进的铠甲护身，也无法排遣发自心底的焦虑。被击碎一切的托尼，如何穿越来自地狱的熊熊烈火……</p>
                                </div>
                                <Divider ></Divider>
                                <div className="movieComment">
                                    <h2><Icon type="like" />热门评论</h2>
                                    {
                                        comment.map((item,index)=>{
                                            return(
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
                                    actor.guide.map((item,index) => {
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
                                    actor.actor.map((item,index) => {
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
                                        img.map((item,index)=>{
                                            return(
                                                <Col key={index} span={4}>
                                                    <Zmage src="http://zmage.caldis.me/imgSet/childsDream/demo.jpg" style={{width:'100%',marginTop:'10px'}}>

                                                    </Zmage>
                                                </Col>
                                            )
                                        })
                                    }
                                   
                                </Row>
                            </TabPane>
                        </Tabs>
                      </Col>
                      <Col span = {10} className="movieMore">
                            <h2><Icon type="heart" />相关电影</h2>
                            <Row gutter={16}>
                                {
                                    movie.map((item,index)=>{
                                        if (index<=5) {
                                            return(
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

export default MovieAbout;