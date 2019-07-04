
import {getAllData, getDataByFilter, getDocumentById} from './getData';
import axios from 'axios';
import {deleteDocumentById} from './delete';

export function getAllCategories(pageRequested, pageSize) {
    return getAllData('categories', pageRequested, pageSize);
}

export function getCategoriesByFilter(searchFilter, searchKeyword, pageRequested, pageSize, sortKey, sortValue) {
    return getDataByFilter('categories', searchFilter, searchKeyword, pageRequested, pageSize, sortKey, sortValue);
}

export function getCategoriesById(id) {
    return getDocumentById('categories', id);
}

export function createNewCategory(name, description) {
    return axios.post('/categories', {name, description})
                .then((res) => {
                    return res;
                });
}

export function deleteCategoryByID(id) {
    return deleteDocumentById('categories', id);
}

export function updateCategoryByID(name, description, id) {
    return axios.put(`/categories/${id}`, {name, description})
                .then((res) => {
                    return res;
                });
}