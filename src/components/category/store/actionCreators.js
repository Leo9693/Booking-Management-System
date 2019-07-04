import { actionTypes } from './index';
import { 
    getAllCategories, 
    getCategoriesByFilter, 
    getCategoriesById, 
    createNewCategory, 
    deleteCategoryByID, 
    updateCategoryByID 
} from '../../../api/category';

export const handleInputChange = (inputName, inputValue) => ({
    type: actionTypes.HANDLE_INPUT_CHANGE,
    inputName,
    inputValue
});

export const handleSearch = (currentPage, pageSize) => {
    // 此处return 函数包裹是必须的，直接getAllData（）出错
    return (dispatch) => {
        getAllCategories(currentPage, pageSize)
            .then((res) => {
                const {documentCountBeforePagination, documentsAfterPagination} = res;
                dispatch(changeList(documentCountBeforePagination, documentsAfterPagination));
            }).catch((err) => dispatch(setError(err)));
    }
};

export const handleSearchByFilter = (searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue) => {
    return (dispatch) => {
        getCategoriesByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue)
            .then((res) => {
                const {documentCountBeforePagination, documentsAfterPagination} = res;
                dispatch(changeList(documentCountBeforePagination, documentsAfterPagination));
            }).catch((err) => dispatch(setError(err)))    
    }
}

const changeList = (documentsCount, documentsList) => ({
    type: actionTypes.CHANGE_LIST,
    documentsCount,
    documentsList
});

export const showCreate = () => ({
    type: actionTypes.SHOW_CREATE
});

export const closeCreate = () => ({
    type: actionTypes.CLOSE_CREATE
});

export const createCategory = (name, description, currentPage, pageSize) => {
    return (dispatch) => {
        createNewCategory(name, description)
            .then((res) => {
                dispatch(closeCreate());
                dispatch(handleSearch(currentPage, pageSize));
            }).catch((err) => dispatch(setError(err)));
    }
}

export const setError = (err) => ({
    type: actionTypes.SET_ERROR,
    errorInfo: err
})

export const setDeleteConfirm = (setValue) => ({
    type: actionTypes.SET_DELETE_CONFIRM,
    setValue
})

export const setSelectedCategoryID = (id) => ({
    type: actionTypes.SET_SELECTED_CATEGORY_ID,
    id
})

export const deleteSelectedCategory = (id, currentPage, pageSize) => {
    return (dispatch) => {
        deleteCategoryByID(id)
            .then(() => {
                dispatch(setSelectedCategoryID(''));
                dispatch(setDeleteConfirm(false));
                dispatch(handleSearch(currentPage, pageSize));
            })
            .catch((err) => dispatch(setError(err)));

    }
}

export const showUpdateModal = (isShowUpdateModal) => ({
    type: actionTypes.SHOW_UPDATE_MODAL,
    isShowUpdateModal
});

export const getUpdateCategory = (id) => {
    return (dispatch) => {
        getCategoriesById(id)
            .then((res) => {
                const {name, description} = res;
                dispatch(handleInputChange('updateCategoryName', name));
                dispatch(handleInputChange('updateCategoryDescription', description));
                // dispatch(setSelectedCategoryID(''));
                // dispatch(setDeleteConfirm(false));
                // dispatch(handleSearch());
            })
            .catch((err) => dispatch(setError(err)));

    }
}

export const updateCategory = (name, description, id, currentPage, pageSize) => {
    return (dispatch) => {
        updateCategoryByID(name, description, id)
            .then((res) => {
                dispatch(setSelectedCategoryID(''));
                dispatch(showUpdateModal(false));
                dispatch(handleSearch(currentPage, pageSize));
                dispatch(handleInputChange('updateCategoryName', ''));
                dispatch(handleInputChange('updateCategoryDescription', ''))
            })
            .catch((err) => dispatch(setError(err)));
    }
}

export const selectPage = (page) => ({
    type: actionTypes.SET_CURRENT_PAGE,
    page
})
