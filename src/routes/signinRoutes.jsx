import React from 'react';
import {Route} from 'react-router-dom';
// import SigninView from '../components/App/loginView';

class SigninRoutes extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                {/* <Route exact path={`${props.match.path}/`} component={SigninView}/> */}
                {/* <Route path={`${props.match.path}/:id`} component={ClientDetailView}/> */}
            </div>
        )
    }
}

export default SigninRoutes
