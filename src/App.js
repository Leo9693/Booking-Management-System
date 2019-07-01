import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Routes from './components/App/routes';
import TopNav from './components/App/topnav';
import {loggedIn} from './api/auth';


class App extends Component {

  render() {
    console.log('App render');
    return (
      <div className="app">
        {
          loggedIn() && <TopNav />
        }
        {/* <TopNav /> */}
        {/* <main className="container"> */}
			  <Routes />
        {/* </main> */}
      </div>

    );
  }
}

export default App;

// function App() {
//  console.log('App');
//   return (

//       <div className="App">
//         {loggedIn() && <TopNav />}
//         {/* <TopNav /> */}
//         <main className="container">
//             <Routes />
//         </main>   
//       </div>

//   );
// }

// export default App;
