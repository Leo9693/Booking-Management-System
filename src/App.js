import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './components/Routes';
import store from './store/index';
import { logout } from './api/auth'
import './App.scss';
 
class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        )
    }
}

export default App;