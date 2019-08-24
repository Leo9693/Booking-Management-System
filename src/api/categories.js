import axios from 'axios';

export function getDocumentsByFilter(searchCondition = { searchField: 'searchAll' }) {
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

export function getCategoryByID(id) {
    return axios.get(`/categories/${id}`)
        .then(res => {
            const { data } = res;
            return data;
        });
}

export function addDocument(newDocument) {
    const { name, description } = newDocument;
    return axios.post('/categories', { name, description });
}

export function updateDocumentByID(document) {
    const { name, description, id } = document;
    return axios.put(`/categories/${id}`, { name, description });
}

export function deleteDocumentByID(id) {
    return axios.delete(`/categories/${id}`);
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
