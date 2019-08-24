import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalLayout from './common/GlobalLayout';
import Home from './Home/Home';
import LoginView from './Admins/Login';
import Signup from './Admins/Signup';
import ChangeProfile from './Admins/ChangeProfile';
import ChangePassword from './Admins/ChangePassword';
import { loggedIn } from '../api/auth';
import Categories from '../components/Categories';
import Businesses from '../components/Businesses';
import Customers from '../components/Customers';
import Orders from '../components/Orders';
import OrderCreate from '../components/Orders/OrderCreate';

export default () => (
    <GlobalLayout>
        <Switch>
            <Route exact path='/admin/login' component={LoginView} />
            <Route exact path='/admin/signup' component={Signup} />
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/businesses' component={Businesses} />
            <ProtectedRoute exact path='/categories/' component={Categories} />
            <ProtectedRoute exact path='/customers' component={Customers} />
            <ProtectedRoute exact path='/orders' component={Orders} />
            <ProtectedRoute exact path='/orders/create' component={OrderCreate} />
            <ProtectedRoute exact path='/admin/change-profile' component={ChangeProfile} />
            <ProtectedRoute exact path='/admin/change-password' component={ChangePassword} />
            <ProtectedRoute exact path='/' component={Home} />
        </Switch>
    </GlobalLayout>

);

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            loggedIn()
                ? (
                    <ProtectedComponent {...props} />
                )
                : (
                    <Redirect
                        to={{
                            pathname: '/admin/login',
                            state: { from: props.location },
                        }}
                    />
                )
        }
    />
}
