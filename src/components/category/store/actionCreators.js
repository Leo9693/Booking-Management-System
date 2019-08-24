import { actionTypes } from './index';
import {
    getAllCategories,
    getCategoriesByFilter,
    getCategoryByID,
    addCategory,
    deleteCategoryByID,
    updateCategoryByID,
    addBusinessToCategoryById,
    getBusinessByFilter,
    deleteBusinessFromCategoryById
} from '../../../api/categories';

export const handleInputChange = (inputName, inputValue) => ({
    type: actionTypes.HANDLE_INPUT_CHANGE,
    inputName,
    inputValue
});

export const handleSearch = (currentPage, pageSize) => {
    // 此处return 函数包裹是必须的，直接getAllData（）出错
    return (dispatch) => {
        dispatch(setIsLoading(true));
        getAllCategories(currentPage, pageSize)
            .then((res) => {
                dispatch(setIsLoading(false));
                const { categoryCount, categories } = res;
                dispatch(changeList(categoryCount, categories));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err))
            });
    }
};

export const handleSearchByFilter = (searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        getCategoriesByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue)
            .then((res) => {
                const { categoryCount, categories } = res;
                dispatch(changeList(categoryCount, categories));
                dispatch(setIsLoading(false));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err))
            })
    }
}

const changeList = (documentCount, documentsList) => ({
    type: actionTypes.CHANGE_LIST,
    documentCount,
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
        dispatch(setIsLoading(true));
        addCategory(name, description)
            .then((res) => {
                dispatch(setIsLoading(false));
                dispatch(closeCreate());
                dispatch(handleSearch(currentPage, pageSize));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err));
            });
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
        dispatch(setIsLoading(true));
        deleteCategoryByID(id)
            .then(() => {
                dispatch(setIsLoading(false));
                dispatch(setSelectedCategoryID(''));
                dispatch(setDeleteConfirm(false));
                dispatch(handleSearch(currentPage, pageSize));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err))
            });

    }
}

export const showUpdateModal = (isShowUpdateModal) => ({
    type: actionTypes.SHOW_UPDATE_MODAL,
    isShowUpdateModal
});

export const getUpdateCategory = (id) => {
    return (dispatch) => {
        getCategoryByID(id)
            .then((res) => {
                const { name, description } = res;
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

export const setIsLoading = (isLoading) => ({
    type: actionTypes.SET_IS_LOADING,
    isLoading
})

export const getDetailedCategory = (id) => {
    return (dispatch) => {
        getCategoryByID(id)
            .then((res) => {
                dispatch(setIsLoading(false));
                console.log('getCategoryByID')
                console.log(res)
                dispatch(handleInputChange('detailedCategory', res));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err))
            });
    }
}

export const addBusinessToCategory = (addedBusinessSelector, addedBusinessInfo, categoryID) => {
    return (dispatch) => {
        if (addedBusinessSelector === 'id') {
            addBusinessToCategoryById(addedBusinessInfo, categoryID)
                .then((res) => {
                    dispatch(setIsLoading(false));;
                    dispatch(getDetailedCategory(categoryID));
                })
                .catch((err) => {
                    dispatch(setIsLoading(false));;
                    dispatch(setError(err))
                });
        } else {
            getBusinessByFilter(addedBusinessSelector, addedBusinessInfo)
                .then((res) => {
                    const id = res.businesses[0]._id;
                    addBusinessToCategoryById(id, categoryID)
                        .then((res) => {
                            dispatch(getDetailedCategory(categoryID));
                        });
                })
                .catch((err) => {
                    dispatch(setIsLoading(false));
                    dispatch(setError(err))
                });
        }
    }
}

export const deleteBusinessFromCategory = (businessID, categoryID) => {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        deleteBusinessFromCategoryById(businessID, categoryID)
            .then(res => {
                dispatch(getDetailedCategory(categoryID));
            })
            .catch((err) => {
                dispatch(setIsLoading(false));
                dispatch(setError(err))
            });
    }
}