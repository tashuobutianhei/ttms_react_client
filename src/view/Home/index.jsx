import React from 'react';
import {  Carousel, AutoComplete, } from 'antd';

import HomePart from '../../component/HomePart/index.jsx';


import CONST from '../../common/const/index.js'
import 'antd/dist/antd.css'
import  './index.scss'




class Home extends React.Component {
    constructor(props) {
        super(props);
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
                        <div>
                        <h3>1</h3>
                        </div>
                        <div>
                        <h3>2</h3>
                        </div>
                        <div>
                        <h3>3</h3>
                        </div>
                        <div>
                        <h3>4</h3>
                        </div>
                    </Carousel>
                    <div className="part">
                        { _date.map((item,index)=>{
                            return (
                              <div className="partItem" key={index} >
                                    <HomePart movieValue={item} ></HomePart>
                              </div>
                            )
                        })}
                    </div>
                </div>
        );

    }
}

export default Home;
