import React from 'react';
import {Route} from 'react-router-dom';
import ClientView from '../components/client/clientView';
import ClientDetailView from '../components/client/clientDetailView';

class ClientRoutes extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                <Route exact path={`${props.match.path}/`} component={ClientView}/>
                <Route path={`${props.match.path}/:id`} component={ClientDetailView}/>
            </div>
        )
    }
}

export default ClientRoutes
