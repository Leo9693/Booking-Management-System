import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Navigation from './navigation';
import Category from '../category';
import CategoryDetails from '../category/categoryDetails';
import { loggedIn } from '../../api/auth';
//import OrderRoutes from './routes/orderRoutes';
//import ClientRoutes from './routes/clientRoutes';
//import SigninRoutes from './routes/signinRoutes';

// import SignupView from './signupView';
// import ClientView from '../client/clientView';

export default () => (
    <div>       
        <Switch>
            <ProtectedRoute exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/nav" component={Navigation} />
            <ProtectedRoute path="/orders" component={() => <h2>This is order page</h2>} />
            <ProtectedRoute exact path="/categories" component={Category} />
            <ProtectedRoute path="/categories/:id" component={CategoryDetails} />
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

const ProtectedRoute = ({component: ProtectedComponent, ...rest}) => {
    console.log("loggedIn()");
    console.log(loggedIn());
    return <Route {...rest}
        render={props => 
            (loggedIn()) ?
            (<ProtectedComponent {...props} />) :
            (<Redirect to="/login" />)
        }
    />
}