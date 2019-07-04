import { combineReducers } from 'redux';
import { reducer as appReducer } from '../components/app/store';
import { reducer as categoryReducer } from '../components/category/store';

const reducer = combineReducers({
    app: appReducer,
    category: categoryReducer
})

export default reducer;