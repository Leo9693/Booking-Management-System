import React, {Component} from 'react';
import store from './store/index';
import { Provider } from 'react-redux';
import Routes from './components/app/routes';
import Navigation from './components/app/navigation';
//import Login from './components/app/login';
// import TopNav from './components/App/topnav';
// import {loggedIn} from './api/auth';

class App extends Component {

  render() {
    console.log('App render');
    return (
      <Provider store={store}>
        <div className="container-fluid ">
          <div className="row no-gutters">
            <div className="col-2">
              <Navigation />
            </div>

            <div className="col-10">
              <Routes />
            </div>
            {/* {
              loggedIn() && <TopNav />
            } */}
            {/* <TopNav /> */}
            {/* <main className="container"> */}

            {/* <Login /> */}
            {/* </main> */}
          </div>
        </div>
      </Provider>
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
