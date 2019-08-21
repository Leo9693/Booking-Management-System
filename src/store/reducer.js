import { combineReducers } from 'redux';
import { reducer as categoryReducer } from '../components/Categories/store';
import { reducer as adminReducer } from '../components/Admins/store';
import { reducer as businessReducer } from '../components/Businesses/store'

const reducer = combineReducers({
    admin: adminReducer,
    category: categoryReducer,
    business: businessReducer,
});

export default reducer;