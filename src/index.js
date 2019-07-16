import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import "./index.scss";
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-block-ui/style.css';

axios.defaults.baseURL = 'https://handyman-cms.herokuapp.com/api';

const baseURL = process.env.PUBLIC_URL || '';


ReactDOM.render(
  <Router basename={baseURL}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
