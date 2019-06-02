import React from 'react';
import { Row, Col} from 'antd';

import 'antd/dist/antd.css'
import  './index.scss'




class Actor extends React.Component {
    constructor(props) {
        super(props);
      } 
      render() {
        let type = this.props.actorType;
        let value = this.props.actor;
        return (
            <div className="actor">
              <img src='/img/actor.jpg' alt="img" ></img>
              <p>
              {
                type == 'guide' ? value.name : `${value.name} 饰演 ${value.actor}`
              }
              </p>
            </div>
        );

    }
}

export default Actor;