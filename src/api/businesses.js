import axios from 'axios';

export function getDocumentsByFilter(searchCondition) {
    const { searchField, searchValue, pageRequested = 1, pageSize = 5, sortType, sortValue } = searchCondition;
    if (searchField === 'searchAll') {
        return axios.get('/businesses', { params: { pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    } else {
        return axios.get('/businesses', { params: { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } })
            .then(res => {
                const { data } = res;
                return data;
            })
    }
}

export function addDocument(newDocument) {
    const { name, ABN, email, phone, streetAddress, postcode } = newDocument;
    return axios.post('/businesses', { name, ABN, email, phone, streetAddress, postcode });
}

export function updateDocumentByID(document) {
    const { name, ABN, email, phone, streetAddress, postcode, id } = document;
    return axios.put(`/businesses/${id}`, { name, ABN, email, phone, streetAddress, postcode });
}

export function deleteDocumentByID(id) {
    return axios.delete(`/businesses/${id}`);
}