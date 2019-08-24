import { actionTypes } from './index';

export const saveLoginInfo = (loginInfo) => {
    return {
        type: actionTypes.SAVE_LOGIN_INFO,
        payload: loginInfo
    }
}

export const saveRegisterInfo = (RegisterInfo) => {
    return {
        type: actionTypes.SAVE_REGISTER_INFO,
        payload: RegisterInfo
    }
}


