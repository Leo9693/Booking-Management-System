import axios from 'axios';

export function getAllData(databaseModel) {
    return axios.get(`/${databaseModel}`).then(res => {
        const {data} = res;
        return data;
    })
}

export function getDataByFilter(databaseModel, conditionKey, conditionValue) {
    console.log(conditionKey);
    console.log(conditionValue);
    return axios.get(`/${databaseModel}`, 
        {params: {conditionKey, conditionValue}})
        .then(res => {
        console.log(res);
        const {data} = res;
        return data; 
    })
}

export function getDocumentById(collection, id) {
    return axios.get(`/${collection}/${id}`)
                .then(res => {
                    const {data} = res;
                    return data;
                });
}