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
        .then((res) => {
            console.log( 'addBusinessToCategoryById');
            console.log(res);
            return res
        })
}

export function deleteBusinessFromCategoryById(deletedBusinessID, categoryID) {
    return axios.delete(`/categories/${categoryID}/businesses/${deletedBusinessID}`)
}

export function getBusinessByName(name) {
    return axios.get('/businesses', {params: {key: name}})
        .then(res => {
            const {data} = res;
            return data; 
        })
}

export function getBusinessByFilter(searchType, searchKeyword) {

        console.log('searchType:' + searchType);
        console.log('searchKeyword:' + searchKeyword);
        return axios.get('/businesses', {params: {searchType, searchKeyword}})
        .then(res => {
            console.log(res);
            const {data} = res;
            return data; 
        })

}
