import React from 'react';
import {Route, Switch} from 'react-router-dom';
//import OrderRoutes from './routes/orderRoutes';
//import ClientRoutes from './routes/clientRoutes';
//import SigninRoutes from './routes/signinRoutes';
import LoginView from './loginView';
import SignupView from './signupView';
import ClientView from '../client/clientView';

export default () => (
    <Switch>
        <Route exact path="/" component={LoginView}/>
        <Route path="/orders" component={() => <h2>This is order page</h2>}/>
        {/* <Route path="/admins" component={AdminRoutes}/> */}
        <Route path="/clients" component={ClientView}/>
        {/* <Route exact path="/businesses" component={businessesView}/>
        <Route exact path="/orders" component={ordersView}/>
        <Route exact path="/categories" component={categoriesView}/> */}
        <Route exact path="/login" component={LoginView} />
        {/* <Route exact path="/singup" component={Signup} /> */}
        <Route exact path="/signup" component={SignupView} />
    </Switch>
)