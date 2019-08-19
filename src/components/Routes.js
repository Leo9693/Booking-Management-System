import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CustomersView from './Customers/CustomersView';
import CustomersDetailView from './Customers/CustomerDetailView';
import CustomerEditView from './Customers/CustomerEditView';
import HandymanView from './Customers/HandymanView';
import OrderManagement from './Orders/Management';
import GlobalLayout from './Ui/GlobalLayout';
import setting from './Admin/Setting';
import Home from './Home';
import OrderView from './Orders/OrderView';
import OrderEdit from './Orders/Edit';
import LoginView from './Admins/Login';
import Signup from './Admins/Signup';
import ChangeProfile from './Admins/ChangeProfile';
import ChangePassword from './Admins/ChangePassword';
import { loggedIn } from '../api/auth';
import Category from '../components/Categories';
import CategoryDetails from '../components/Categories/categoryDetails';
import BusinessDisplay from './Businesses/BusinessDisplay';
import BusinessList from './Businesses/BusinessList';


export default () => (
    <GlobalLayout>
        <Switch>
            <Route exact path='/admin/login' component={LoginView} />
            <Route exact path='/admin/signup' component={LoginView} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/customers' component={CustomersView} />
            <ProtectedRoute exact path='/customers/edit/:id' component={CustomerEditView} />
            <ProtectedRoute exact path='/customers/:id' component={CustomersDetailView} />
            <ProtectedRoute exact path='/customers/booking/:id' component={HandymanView} />
            <ProtectedRoute exact path='/orders/management' component={OrderManagement} />
            <ProtectedRoute exact path='/orders/management/edit/:id' component={OrderEdit} />
            <ProtectedRoute exact path='/orders/management/:id' component={OrderView} />
            <ProtectedRoute exact path='/businesses' component={BusinessDisplay} />
            <ProtectedRoute exact path='/businesses/list' component={BusinessList} />
            <ProtectedRoute exact path='/businesses/list/:id' component={BusinessList} />
            <ProtectedRoute exact path='/categories/' component={Category} />
            <ProtectedRoute exact path='/categories/:id' component={CategoryDetails} />
            <ProtectedRoute exact path='/admin/setting' component={setting} />
            <ProtectedRoute exact path='/admin/change-profile' component={ChangeProfile} />
            <ProtectedRoute exact path='/admin/change-password' component={ChangePassword} />
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
