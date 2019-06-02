import React from 'react';
import { Row, Col,Button,Rate,Comment, Icon, Tooltip, Avatar} from 'antd';
import moment from 'moment';

import 'antd/dist/antd.css'
import  './index.scss'




class MovieComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
       
        }
      } 
      
      render() {
        return (
              <div className="talk">
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                         alt="Han Solo"
                    />
                    }
                    content={
                       <p>
                                We supply a series of design principles, practical patterns and high quality design
                                resources (Sketch and Axure), to help people create their product prototypes beautifully
                                and efficiently.
                       </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                 />
              </div>      
        );

    }
}

export default MovieComment;