import { actionTypes } from './index';

const defaultState = {
    searchKeyword: '',
    searchFilter: 'searchAll',
    documentCount: 0,
    documentsList: '',
    currentPage: 1,
    pageSize: 5,
    isShowCreate: false,
    newCategoryDescription: '',
    newCategoryName: '',
    errorInfo: '',
    isShowDeleteConfirm: false,
    selectedCategoryID: '',
    isShowUpdateModal: false,
    updateCategoryName: '',
    updateCategoryDescription: '',
    setPageAs: 1,
    sortKey: 'name',
    sortValue: 1,
    isLoading: false,
    detailedCategory: {},
    addedBusinessSelector: 'businessName',
    addedBusinessInfo: '',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.HANDLE_INPUT_CHANGE:            
            const {inputName, inputValue} = action;
            return {...state, [inputName]: inputValue};
        
        case actionTypes.CHANGE_LIST:
            const {documentCount, documentsList} = action;
            return {...state, documentCount, documentsList};

        case actionTypes.SHOW_CREATE:
            return {...state, isShowCreate: true};
        case actionTypes.CLOSE_CREATE:
            return {...state, isShowCreate: false};

        case actionTypes.CREATE_CATEGORY:
            const {newCategoryName, newCategoryDescription} = action;
            return {...state, newCategoryName, newCategoryDescription}
        
        case actionTypes.SET_ERROR:
            const {errorInfo} = action;
            return {...state, errorInfo}

        case actionTypes.SET_DELETE_CONFIRM:
            const {setValue} = action;
            return {...state, isShowDeleteConfirm: setValue}

        case actionTypes.SET_SELECTED_CATEGORY_ID:
            const {id} = action;
            return {...state, selectedCategoryID: id}

        case actionTypes.SHOW_UPDATE_MODAL:
            const {isShowUpdateModal} = action;
            return {...state, isShowUpdateModal};

        case actionTypes.SET_CURRENT_PAGE:
            const {page} = action;
            return {...state, currentPage: page};

        case actionTypes.SET_IS_LOADING:
            const {isLoading} = action;
            console.log("isLoading" + isLoading);
            return {...state, isLoading};
        default:
            return state;
    }
}