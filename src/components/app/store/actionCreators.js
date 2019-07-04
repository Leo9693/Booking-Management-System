import { actionTypes } from './index';
//import { login } from '../../../api/auth';

export const inputChange = (inputKey, inputValue) => ({
    type: actionTypes.HANDLE_INPUT_CHANGE,
    inputKey,
    inputValue
});

export const setLoginError = (err) => ({
    type: actionTypes.SET_LOGIN_ERROR,
    err
});

export const setSignupError = (err) => ({
    type: actionTypes.SET_SIGNUP_ERROR,
    err
});
