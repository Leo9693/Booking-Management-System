import { combineReducers } from 'redux';
import { reducer as appReducer } from '../components/app/store';

const reducer = combineReducers({
    app: appReducer,
})

export default reducer;