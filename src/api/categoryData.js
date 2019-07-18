import axios from 'axios';

export function getAllCategories(pageRequested, pageSize) {
    return axios.get('/categories', {params: {pageRequested, pageSize}})
                .then(res => { 
                    const {data}= res;
                    return data;
                })
}

export function getCategoriesByFilter(searchType, searchKeyword, pageRequested, pageSize, sortType, sortValue) {
    if (searchType === 'searchAll') {
        return axios.get('/categories', {params: {pageRequested, pageSize, sortType, sortValue}})
                    .then(res => {
                        const {data} = res;
                        return data;
                    })
    } else {
        return axios.get('/categories', {params: {searchType, searchKeyword, pageRequested, pageSize, sortType, sortValue}})
                    .then(res => {
                        const {data} = res;
                        return data;
                    })
    }
}

export function getCategoriesById(id) {
    return axios.get(`/categories/${id}`)
                .then(res => {
                    const {data} = res;
                    return data;
                });
}

export function createNewCategory(name, description) {
    return axios.post('/categories', {name, description});
}

export function deleteCategoryByID(id) {
    return axios.delete(`/categories/${id}`);
}

export function updateCategoryByID(name, description, id) {
    return axios.put(`/categories/${id}`, {name, description})
}

export function addBusinessToCategoryById(addedBusinessInfo, categoryID) {
    return axios.post(`/categories/${categoryID}/businesses/${addedBusinessInfo}`)
}

export function deleteBusinessFromCategoryById(addedBusinessInfo, categoryID) {
    return axios.delete(`/categories/${categoryID}/businesses/${addedBusinessInfo}`)
}

export function getDataByFilter(databaseModel, conditionKey, conditionValue, pageRequested, pageSize, sortKey, sortValue) {
    // if (conditionKey === 'searchAll') {
    //     console.log('sortKey1:' + sortKey);
    //     return axios.get(`/${databaseModel}`, {params: {pageRequested, pageSize, sortKey, sortValue}})
    //                 .then(res => {
    //                     const {data} = res;
    //                     return data; 
    //                 })
    // } else {
    //     console.log('sortKey2:' + sortKey);
    //     return axios.get(`/${databaseModel}`, {params: {conditionKey, conditionValue, pageRequested, pageSize, sortKey, sortValue}})
    //     .then(res => {
    //         const {data} = res;
    //         return data; 
    //     })
    // }
}

export function getBusinessByName (key) {
    return axios.get('/businesses', {params: {key}})
}