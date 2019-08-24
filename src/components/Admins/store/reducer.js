import { actionTypes } from './index';

const defaultState = {
    email: '',
    name: '',
    token: '',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_LOGIN_INFO:
            return { ...state, ...action.payload };
        
        case actionTypes.SAVE_REGISTER_INFO:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}