import axios from 'axios';

export function deleteDocumentById(collection, id) {
    return axios.delete(`/${collection}/${id}`);
}