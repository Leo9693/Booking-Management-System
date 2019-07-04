import axios from 'axios';

export function getAllData(databaseModel, pageRequested, pageSize) {
    return axios.get(`/${databaseModel}`,
        {params: {pageRequested, pageSize}}).
        then(res => {
        const {data} = res;
        return data;
    })
}

export function getDataByFilter(databaseModel, conditionKey, conditionValue, pageRequested, pageSize, sortKey, sortValue) {
    if (conditionKey === 'searchAll') {
        console.log('sortKey1:' + sortKey);
        return axios.get(`/${databaseModel}`, {params: {pageRequested, pageSize, sortKey, sortValue}})
                    .then(res => {
                        const {data} = res;
                        return data; 
                    })
    } else {
        console.log('sortKey2:' + sortKey);
        return axios.get(`/${databaseModel}`, {params: {conditionKey, conditionValue, pageRequested, pageSize, sortKey, sortValue}})
        .then(res => {
            const {data} = res;
            return data; 
        })
    }
}

export function getDocumentById(collection, id) {
    return axios.get(`/${collection}/${id}`)
                .then(res => {
                    const {data} = res;
                    return data;
                });
}