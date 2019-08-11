import { combineReducers } from 'redux';
import { reducer as categoryReducer } from '../components/category/store'
import { reducer as adminReducer } from '../components/Admins/store'

const reducer = combineReducers({
    admin: adminReducer,
    category: categoryReducer,
});

export default reducer;