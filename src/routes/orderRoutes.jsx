import React from 'react';
import {Route} from 'react-router-dom';
import OrderView from '../components/order/orderView';

class OrderRoutes extends React.Component {

    render() {

        return (
            <div>
                <Route exact path={`${this.props.match.path}/`} component={OrderView}/>
            </div>
        )
    }
}

export default OrderRoutes
