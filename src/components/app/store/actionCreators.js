import { actionTypes } from './index';
import { login } from '../../../api/auth';

export const inputChange = (inputKey, inputValue) => ({
    type: actionTypes.LOGIN_INPUT,
    inputKey,
    inputValue
});

export const setError = (err) => ({
    type: actionTypes.SET_ERROR,
    err
});


