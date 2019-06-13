import React from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.scss'




class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false
    }
  }
  ClickHandle() {
    this.setState({
      showModel: !this.state.showModel
    })
  }
  enterMovie() {
    this.props.history.push(`/MovieItem/${this.props.movieValue.filmId}/value`);
  }
  render() {
    let movieValue = this.props.movieValue
    return (
      <div className="movieItem">
        {
          movieValue.tag ? <div className="MoiveTag">{movieValue.tag ? movieValue.tag[0] : ''}</div> : ''
        }
        <Row>
          <Col>
            <img src={`http://192.168.1.179:8080/${movieValue.imgAddress}`} alt="img" onClick={this.ClickHandle.bind(this)} />
          </Col>

          <div className="MovieItemModel" onClick={this.ClickHandle.bind(this)} >
            <div className="MovieItemModelValue">
              <p>{movieValue.filmName}<span>{movieValue.filmScore ? movieValue.filmScore : '8.7分'}</span></p>
              <p>{movieValue.filmType ? movieValue.filmType : ''}</p>
              <p>{movieValue.showTime ? movieValue.showTime : ''}</p>
            </div>
          </div>

          <Col className="movieName" onClick={this.enterMovie.bind(this)}>
            <span>{movieValue.filmName}</span>
          </Col>
        </Row>
      </div>

    );

  }
}

export default withRouter(MovieItem);