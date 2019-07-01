import { actionTypes } from './index';

const defaultState = {
    loginEmail: '',
    loginPassword: '',
    loginError: null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_INPUT:
            // const newState = Object.assign({}, state);
            // newState[action.inputKey] = action.inputValue;
            // 上面和下面两种写法都可以
            const {inputKey, inputValue} = action;            
            return {...state, [inputKey]: inputValue};
        case actionTypes.SET_ERROR:
            return {...state, loginError: action.err};
        default:
            return state;
    }
}