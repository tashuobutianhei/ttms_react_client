import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import Tool from './common/const/tool.js'


axios.interceptors.request.use(function (config) {
    config.withCredentials = true;
    config.baseURL = 'http://192.168.1.179:8080';
    if (Tool.getCookie('TTMS_token')) {
      config.headers = {
        "Authorization": `Bearer ${Tool.getCookie('TTMS_token')}`
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
