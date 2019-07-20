import { combineReducers } from 'redux';
import { reducer as categoryReducer } from '../components/category/store'

const reducer = combineReducers({
    category: categoryReducer,
});

export default reducer;