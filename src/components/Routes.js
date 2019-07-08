import React from 'react';
import { Switch, Route, Redirect ,Router, HashRouter} from 'react-router-dom';

import OrderManagement from './Orders/Management';
import BasicLayout from './Ui/index';
import setting from './Admin/Setting';
import Home from './Home';
import OrderView from './Orders/OrderView';
import OrderEdit from './Orders/Edit';
import LoginView from './Admin/Login';
import {loggedIn} from "../api/auth";



export default () => (
    <div>
      
      {
     !loggedIn() &&   
     <Route exact path="/" component={LoginView} />  
    //  <loginRoute exact path="/login" component={LoginView} />
      }   
       {
     loggedIn() &&
     <BasicLayout>
     <ProtectedRoute exact path="/" component={Home} />
     <ProtectedRoute exact path="/orders/management" component={OrderManagement} /> 
     <ProtectedRoute exact path="/orders/management/edit/:id" component={OrderEdit} />  
     <ProtectedRoute exact path="/orders/management/:id" component={OrderView} />     
     <ProtectedRoute exact path="/admin/setting" component={setting} />
     <Route exact path="/admin/login" component={LoginView} />      
     </BasicLayout>
       }
     </div>
   

);


const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
  return <Route
    {...rest}
    render={props =>
      loggedIn() ? (
        <ProtectedComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
}