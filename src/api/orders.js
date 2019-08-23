import axios from 'axios';

export function getDocumentsByFilter(searchCondition = { searchField: 'searchAll' }) {
    const { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } = searchCondition;
    if (searchField === 'searchAll') {
        return axios.get('/orders', { params: { pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    } else {
        return axios.get('/orders', { params: { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    }
}

export function addDocument(newDocument) {
    const { customer, business, category, jobEstimatedTime, jobLocation, status } = newDocument;
    return axios.post('/orders', { customer, business, category, jobEstimatedTime, jobLocation, status });
}

export function updateDocumentByID(document) {
    const { customer, business, category, jobEstimatedTime, jobLocation, status, rate, comment, id } = document;
    return axios.put(`/orders/${id}`, { customer, business, category, jobEstimatedTime, jobLocation, status, rate, comment });
}

export function deleteDocumentByID(id) {
    return axios.delete(`/orders/${id}`);
}