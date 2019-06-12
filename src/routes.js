import React from 'react';
import {Route, Switch} from 'react-router-dom';
import adminRoutes from './routes/adminRoutes';
import clientRoutes from './routes/clientRoutes';

export default () => (
    <Switch>
        <Route exact path="/" component={adminRoutes}/>
        <Route path="/admins" component={adminRoutes}/>
        <Route path="/clients" component={clientRoutes}/>
        {/* <Route exact path="/businesses" component={businessesView}/>
        <Route exact path="/orders" component={ordersView}/>
        <Route exact path="/categories" component={categoriesView}/> */}
    </Switch>
)