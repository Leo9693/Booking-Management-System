import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminRoutes from './routes/adminRoutes';
import ClientRoutes from './routes/clientRoutes';
import SigninRoutes from './routes/signinRoutes';

export default () => (
    <Switch>
        <Route exact path="/" component={AdminRoutes}/>
        <Route exact path="/admins" component={AdminRoutes}/>
        <Route exact path="/clients" component={ClientRoutes}/>
        {/* <Route exact path="/businesses" component={businessesView}/>
        <Route exact path="/orders" component={ordersView}/>
        <Route exact path="/categories" component={categoriesView}/> */}
        <Route exact path="/signin" component={SigninRoutes} />
    </Switch>
)