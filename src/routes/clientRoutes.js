import React from 'react';
import {Route, Switch} from 'react-router-dom';
import clientView from '../components/client/clientView';
import clientDetailView from '../components/client/clientDetailView';

class clientRoutes extends React.Component {

    render() {
        const props = this.props;
        return (
            <Switch>
                <Route exact path={`${props.match.path}/`} component={clientView}/>
                <Route path={`${props.match.path}/:id`} component={clientDetailView}/>
            </Switch>
        )
    }
}

export default clientRoutes
