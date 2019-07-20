import React, { Component } from 'react';
import  Router from './components/Routes';
import store from './store/index';
import { Provider } from 'react-redux';
import './styles/order.css';
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