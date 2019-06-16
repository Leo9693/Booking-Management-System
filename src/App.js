import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import Routes from './routes';
import TopNav from './components/app/topnav';

import {loggedIn} from './api/auth';


class App extends Component {

  render() {
    console.log('App render');
    return (

      <div>
        {
          loggedIn() && <TopNav />
        }
        <main className="container">
          <Routes />
        </main>
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
