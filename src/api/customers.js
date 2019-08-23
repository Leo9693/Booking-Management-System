import axios from 'axios';

export function getDocumentsByFilter(searchCondition = { searchField: 'searchAll' }) {
    const { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } = searchCondition;
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