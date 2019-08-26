import { actionTypes } from './index';

const defaultState = {
    documentCount: 0,
    documentsList: '',
    errorInfo: '',
    isLoading: false,
    isShowModal: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING:
            const { isLoading } = action;
            return { ...state, isLoading };

        case actionTypes.SET_ERROR:
            const { errorInfo } = action;
            return { ...state, errorInfo }

        case actionTypes.SET_IS_SHOW_MODAL:
            const { isShowModal } = action;
            return { ...state, isShowModal };

        case actionTypes.SET_DOCUMENTS_LIST:
            const { documentCount, documentsList } = action;
            return { ...state, documentCount, documentsList };

        default:
            return state;
    }
}