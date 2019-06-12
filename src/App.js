import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import TopNav from './components/app/topnav';

function App() {
  return (

      <div className="App">TopNav
        <TopNav></TopNav>
        {/* <div className="container"> */}
            <Routes></Routes>
        {/* </div> */}
        
      </div>

  );
}

export default App;
