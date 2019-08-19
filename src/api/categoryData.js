import axios from 'axios';

export function getAllCategories(pageRequested, pageSize) {
    return axios.get('/categories', { params: { pageRequested, pageSize } })
        .then(res => {
            const { data } = res;
            return data;
        })
}

export function getCategoriesByFilter(searchCondition) {
    const { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } = searchCondition;
    if (searchField === 'searchAll') {
        return axios.get('/categories', { params: { pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    } else {
        return axios.get('/categories', { params: { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    }
}

export function getCategoriesById(id) {
    return axios.get(`/categories/${id}`)
        .then(res => {
            const { data } = res;
            return data;
        });
}

export function addCategory(newCategory) {
    const { name, description } = newCategory;
    return axios.post('/categories', { name, description });
}

export function deleteCategoryByID(id) {
    return axios.delete(`/categories/${id}`);
}

export function updateCategoryByID(name, description, id) {
    return axios.put(`/categories/${id}`, { name, description })
}

export function addBusinessToCategoryById(addedBusinessInfo, categoryID) {
    return axios.post(`/categories/${categoryID}/businesses/${addedBusinessInfo}`)
        .then((res) => {
            return res
        })
}

export function deleteBusinessFromCategoryById(deletedBusinessID, categoryID) {
    return axios.delete(`/categories/${categoryID}/businesses/${deletedBusinessID}`)
}

export function getBusinessByName(name) {
    return axios.get('/businesses', { params: { key: name } })
        .then(res => {
            const { data } = res;
            return data;
        })
}

export function getBusinessByFilter(searchType, searchKeyword) {
    return axios.get('/businesses', { params: { searchType, searchKeyword } })
        .then(res => {
            const { data } = res;
            return data;
        })

}
