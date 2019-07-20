import React from 'react';
import { Switch, Route, Redirect, Router, HashRouter } from 'react-router-dom';
import CustomersView from './Customers/CustomersView';
import CustomersDetailView from './Customers/CustomerDetailView';
import CustomerEditView from './Customers/CustomerEditView';
import HandymanView from './Customers/HandymanView';
import OrderManagement from './Orders/Management';
import BasicLayout from './Ui/index';
import setting from './Admin/Setting';
import Home from './Home';
import OrderView from './Orders/OrderView';
import OrderEdit from './Orders/Edit';
import LoginView from './Admin/Login';
import { loggedIn } from '../api/auth';
import Category from '../components/category';
import CategoryDetails from '../components/category/categoryDetails';
import BusinessDisplay from './Businesses/BusinessDisplay';
import BusinessList from './Businesses/BusinessList';

export default () => (
  <div>
    {!loggedIn() && <Route exact path='/' component={LoginView} />
    //  <loginRoute exact path="/login" component={LoginView} />
    }
    {loggedIn() && (
      <BasicLayout>
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/customers' component={CustomersView} />
        <ProtectedRoute
          exact
          path='/customers/edit/:id'
          component={CustomerEditView}
        />
        <ProtectedRoute
          exact
          path='/customers/:id'
          component={CustomersDetailView}
        />
        <ProtectedRoute
          exact
          path='/customers/booking/:id'
          component={HandymanView}
        />
        <ProtectedRoute
          exact
          path='/orders/management'
          component={OrderManagement}
        />
        <ProtectedRoute
          exact
          path='/orders/management/edit/:id'
          component={OrderEdit}
        />
        <ProtectedRoute
          exact
          path='/orders/management/:id'
          component={OrderView}
        />
        <ProtectedRoute exact path='/businesses' component={BusinessDisplay} />
        <ProtectedRoute
          exact
          path='/businesses/list'
          component={BusinessList}
        />
        <ProtectedRoute
          exact
          path='/businesses/list/:id'
          component={BusinessList}
        />
        <ProtectedRoute exact path='/categories/' component={Category} />
        <ProtectedRoute path='/categories/:id' component={CategoryDetails} />
        <ProtectedRoute exact path='/admin/setting' component={setting} />
        <Route exact path='/admin/login' component={LoginView} />
      </BasicLayout>
    )}
  </div>
);

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn() ? (
          <ProtectedComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
