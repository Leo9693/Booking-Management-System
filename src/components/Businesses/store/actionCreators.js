import { actionTypes } from './index';
import {
    getDocumentsByFilter,
    addDocument,
    updateDocumentByID,
    deleteDocumentByID,
} from '../../../api/businesses';

export const setIsLoading = isLoading => ({
    type: actionTypes.SET_IS_LOADING,
    isLoading
});

export const setError = errorInfo => ({
    type: actionTypes.SET_ERROR,
    errorInfo
})

export const setIsShowModal = isShowModal => ({
    type: actionTypes.SET_IS_SHOW_MODAL,
    isShowModal
})

const setDocumentsList = (documentCount, documentsList) => ({
    type: actionTypes.SET_DOCUMENTS_LIST,
    documentCount,
    documentsList
});

export const searchByFilterAsync = searchCondition => {
    return dispatch => {
        dispatch(setError(null));
        dispatch(setIsLoading(true));
        getDocumentsByFilter(searchCondition)
            .then(res => {
                const { documentCount, documents } = res;
                dispatch(setDocumentsList(documentCount, documents));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            })
    }
}

export const addDocumentAsync = (document, searchCondition) => {
    return dispatch => {
        dispatch(setError(null));
        dispatch(setIsLoading(true));
        addDocument(document)
            .then(res => {
                dispatch(setIsShowModal(false));
                getDocumentsByFilter(searchCondition)
                    .then(res => {
                        const { documentCount, documents } = res;
                        dispatch(setDocumentsList(documentCount, documents));
                        dispatch(setIsLoading(false));
                    })
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            });
    }
}

export const updateDocumentAsync = (document, searchCondition) => {
    return dispatch => {
        dispatch(setError(null));
        dispatch(setIsLoading(true));
        updateDocumentByID(document)
            .then(res => {
                dispatch(setIsShowModal(false));
                getDocumentsByFilter(searchCondition)
                    .then(res => {
                        const { documentCount, documents } = res;
                        dispatch(setDocumentsList(documentCount, documents));
                        dispatch(setIsLoading(false));
                    })
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            });
    }
}

export const deleteDocumentAsync = (id, searchCondition) => {
    return dispatch => {
        dispatch(setError(null));
        dispatch(setIsLoading(true));
        deleteDocumentByID(id)
            .then(res => {
                getDocumentsByFilter(searchCondition)
                    .then(res => {
                        const { documentCount, documents } = res;
                        dispatch(setDocumentsList(documentCount, documents));
                        dispatch(setIsLoading(false));
                    })
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            });
    }
}