import axios from 'axios';

export function getDocumentsByFilter(searchCondition) {
    const { searchField, searchValue, pageRequested = 1, pageSize = 5, sortType, sortValue } = searchCondition;
    if (searchField === 'searchAll') {
        return axios.get('/customers', { params: { pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    } else {
        return axios.get('/customers', { params: { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    }
}

export function addDocument(newDocument) {
    const { name, email, phone } = newDocument;
    return axios.post('/customers', { name, email, phone });
}

export function updateDocumentByID(document) {
    const { name, email, phone, id } = document;
    return axios.put(`/customers/${id}`, { name, email, phone });
}

export function deleteDocumentByID(id) {
    return axios.delete(`/customers/${id}`);
}