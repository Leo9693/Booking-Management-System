import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Navigation from './navigation';
import Category from '../category';
//import OrderRoutes from './routes/orderRoutes';
//import ClientRoutes from './routes/clientRoutes';
//import SigninRoutes from './routes/signinRoutes';

// import SignupView from './signupView';
// import ClientView from '../client/clientView';

export default () => (
    <div>       
        <Switch>
            {/* <Route exact path="/" component={Navigation} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/nav" component={Navigation} />
            <Route path="/orders" component={() => <h2>This is order page</h2>} />
            <Route path="/categories" component={Category} />
            {/* <Route path="/admins" component={AdminRoutes}/> */}
            {/* <Route path="/clients" component={ClientView}/> */}
            {/* <Route exact path="/businesses" component={businessesView}/>
            <Route exact path="/orders" component={ordersView}/>
            <Route exact path="/categories" component={categoriesView}/> */}
            {/* <Route exact path="/login" component={LoginView} /> */}
            {/* <Route exact path="/singup" component={Signup} /> */}
            {/* <Route exact path="/signup" component={SignupView} /> */}
        </Switch>
    </div>
    
)