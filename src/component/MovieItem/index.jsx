import React from 'react';
import { Row, Col} from 'antd';
import { withRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import  './index.scss'




class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModel : false
        }
      } 
      ClickHandle(){
        this.setState({
          showModel:!this.state.showModel
        })
      }
      enterMovie(){
        this.props.history.push(`/MovieItem/${this.props.movieValue.id}/value`);
      }
      render() {
        let movieValue = this.props.movieValue
        return (
            <div className="movieItem">
              {
                movieValue.tag ? <div className="MoiveTag">{movieValue.tag?movieValue.tag[0]:''}</div> :''
              }
              <Row>
                 <Col>      
                 <img src={`/img/${movieValue.img}`} alt="img"  onClick={this.ClickHandle.bind(this)}/>
                   
                 </Col>
 
                    <div className="MovieItemModel" onClick={this.ClickHandle.bind(this)} >
                      <div className="MovieItemModelValue">
                        <p>{movieValue.name}<span>{movieValue.rank?movieValue.rank:'8.7分'}</span></p>
                        <p>{movieValue.name}</p>
                        <p>{movieValue.name}</p>
                      </div>
                    </div>
                    
                 <Col className="movieName"  onClick={this.enterMovie.bind(this)}>
                    <span>{movieValue.name}</span>
                 </Col>
              </Row>
            </div>
            
        );

    }
}

export default withRouter(MovieItem);