import { actionTypes } from './index';

const defaultState = {
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    signupPasswordAgain: '',
    signupError: null
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.HANDLE_INPUT_CHANGE:
            // const newState = Object.assign({}, state);
            // newState[action.inputKey] = action.inputValue;
            // 上面和下面两种写法都可以
            const {inputKey, inputValue} = action;            
            return {...state, [inputKey]: inputValue};
        case actionTypes.SET_LOGIN_ERROR:
            return {...state, loginError: action.err};
        case actionTypes.SET_SIGNUP_ERROR:
            return {...state, signupError: action.err};
        default:
            return state;
    }
}