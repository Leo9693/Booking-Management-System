import { actionTypes } from './index';
import {
    getAllCategories,
    getDocumentsByFilter,
    getCategoryByID,
    addDocument,
    updateDocumentByID,
    deleteDocumentByID,
    addBusinessToCategoryById,
    getBusinessByFilter,
    deleteBusinessFromCategoryById
} from '../../../api/categories';

// export const handleInputChange = (inputName, inputValue) => ({
//     type: actionTypes.HANDLE_INPUT_CHANGE,
//     inputName,
//     inputValue
// });

// export const handleSearch = (currentPage, pageSize) => {
//     // 此处return 函数包裹是必须的，直接getAllData（）出错
//     return (dispatch) => {
//         dispatch(setIsLoading(true));
//         getAllCategories(currentPage, pageSize)
//             .then((res) => {
//                 dispatch(setIsLoading(false));
//                 const { categoryCount, categories } = res;
//                 dispatch(setDocumentsList(categoryCount, categories));
//             })
//             .catch((err) => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setError(err))
//             });
//     }
// };

// export const handleSearchByFilter = (searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue) => {
//     return (dispatch) => {
//         dispatch(setIsLoading(true));
//         getDocumentsByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue)
//             .then((res) => {
//                 const { categoryCount, categories } = res;
//                 dispatch(setDocumentsList(categoryCount, categories));
//                 dispatch(setIsLoading(false));
//             })
//             .catch((err) => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setError(err))
//             })
//     }
// }



// export const showCreate = () => ({
//     type: actionTypes.SHOW_CREATE
// });

// export const closeCreate = () => ({
//     type: actionTypes.CLOSE_CREATE
// });





// export const setDeleteConfirm = (setValue) => ({
//     type: actionTypes.SET_DELETE_CONFIRM,
//     setValue
// })

// export const setSelectedCategoryID = (id) => ({
//     type: actionTypes.SET_SELECTED_CATEGORY_ID,
//     id
// })

// export const deleteSelectedCategory = (id, currentPage, pageSize) => {
//     return (dispatch) => {
//         dispatch(setIsLoading(true));
//         deleteDocumentByID(id)
//             .then(() => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setSelectedCategoryID(''));
//                 dispatch(setDeleteConfirm(false));
//                 dispatch(handleSearch(currentPage, pageSize));
//             })
//             .catch((err) => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setError(err))
//             });

//     }
// }

// export const showUpdateModal = (isShowUpdateModal) => ({
//     type: actionTypes.SHOW_UPDATE_MODAL,
//     isShowUpdateModal
// });

// export const getUpdateCategory = (id) => {
//     return (dispatch) => {
//         getCategoriesById(id)
//             .then((res) => {
//                 const { name, description } = res;
//                 dispatch(handleInputChange('updateCategoryName', name));
//                 dispatch(handleInputChange('updateCategoryDescription', description));
//                 // dispatch(setSelectedCategoryID(''));
//                 // dispatch(setDeleteConfirm(false));
//                 // dispatch(handleSearch());
//             })
//             .catch((err) => dispatch(setError(err)));

//     }
// }

// export const updateCategory = (name, description, id, currentPage, pageSize) => {
//     return (dispatch) => {
//         updateDocumentByID(name, description, id)
//             .then((res) => {
//                 dispatch(setSelectedCategoryID(''));
//                 dispatch(showUpdateModal(false));
//                 dispatch(handleSearch(currentPage, pageSize));
//                 dispatch(handleInputChange('updateCategoryName', ''));
//                 dispatch(handleInputChange('updateCategoryDescription', ''))
//             })
//             .catch((err) => dispatch(setError(err)));
//     }
// }

// export const selectPage = (page) => ({
//     type: actionTypes.SET_CURRENT_PAGE,
//     page
// })



// export const getDetailedCategory = (id) => {
//     return (dispatch) => {
//         getCategoriesById(id)
//             .then((res) => {
//                 dispatch(setIsLoading(false));
//                 console.log('getCategoriesById')
//                 console.log(res)
//                 dispatch(handleInputChange('detailedCategory', res));
//             })
//             .catch((err) => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setError(err))
//             });
//     }
// }

// export const addBusinessToCategory = (addedBusinessSelector, addedBusinessInfo, categoryID) => {
//     return (dispatch) => {
//         if (addedBusinessSelector === 'id') {
//             addBusinessToCategoryById(addedBusinessInfo, categoryID)
//                 .then((res) => {
//                     dispatch(setIsLoading(false));;
//                     dispatch(getDetailedCategory(categoryID));
//                 })
//                 .catch((err) => {
//                     dispatch(setIsLoading(false));;
//                     dispatch(setError(err))
//                 });
//         } else {
//             getBusinessByFilter(addedBusinessSelector, addedBusinessInfo)
//                 .then((res) => {
//                     const id = res.businesses[0]._id;
//                     addBusinessToCategoryById(id, categoryID)
//                         .then((res) => {
//                             dispatch(getDetailedCategory(categoryID));
//                         });
//                 })
//                 .catch((err) => {
//                     dispatch(setIsLoading(false));
//                     dispatch(setError(err))
//                 });
//         }
//     }
// }

// export const deleteBusinessFromCategory = (businessID, categoryID) => {
//     return (dispatch) => {
//         dispatch(setIsLoading(true));
//         deleteBusinessFromCategoryById(businessID, categoryID)
//             .then(res => {
//                 dispatch(getDetailedCategory(categoryID));
//             })
//             .catch((err) => {
//                 dispatch(setIsLoading(false));
//                 dispatch(setError(err))
//             });
//     }
// }

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

// export const selectPage = (pageSelected, searchCondition) => {
//     return dispatch => {

//     }
// }