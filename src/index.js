import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import './style/index.scss'
axios.defaults.baseURL = 'https://booking-management-database.herokuapp.com/V1';

const baseURL = process.env.PUBLIC_URL || '';

ReactDOM.render(
    <BrowserRouter basename={baseURL}>
        <App />
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
