import React from 'react';
import {Route, Switch} from 'react-router-dom';
import adminView from '../components/admin/adminView';
import adminDetailView from '../components/admin/adminDetailView';

class adminRoutes extends React.Component {


    render() {
        const props = this.props;
        return (
            <Switch>
                <Route exact path={`${props.match.path}/`} component={adminView}/>
                <Route path={`${props.match.path}/:id`} component={adminDetailView}/>
            </Switch>
        )
    }
}

export default adminRoutes


