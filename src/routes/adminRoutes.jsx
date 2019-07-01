import React from 'react';
import {Route} from 'react-router-dom';
import AdminView from '../components/admin/adminView';
import AdminDetailView from '../components/admin/adminDetailView';

class AdminRoutes extends React.Component {


    render() {
        const props = this.props;
        return (
            <div>
                <Route exact path={`${props.match.path}/`} component={AdminView}/>
                <Route path={`${props.match.path}/:id`} component={AdminDetailView}/>
            </div>
        )
    }
}

export default AdminRoutes


