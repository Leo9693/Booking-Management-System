import { combineReducers } from 'redux';
import { reducer as adminReducer } from '../components/Admins/store';
import { reducer as categoryReducer } from '../components/Categories/store';
import { reducer as businessReducer } from '../components/Businesses/store';
import { reducer as customerReducer } from '../components/Customers/store';
import { reducer as orderReducer } from '../components/Orders/store';

const reducer = combineReducers({
    admin: adminReducer,
    category: categoryReducer,
    business: businessReducer,
    customer: customerReducer,
    order: orderReducer,
});

export default reducer;