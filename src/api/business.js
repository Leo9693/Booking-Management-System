import axios from 'axios';


export function fetchBusinesses(){
    return axios
    .get('/businesses')
    .then((response) => {return response.data}) //箭头函数 
}


export function fetchBusinessById(id){
    return axios
    .get(`/businesses/${id}`)
    .then(response=>{
        const business=response.data;
        return business; 
    })
    .catch(error=>{
        if (error.response){
            const errorData=error.response;
            throw new Error(`${errorData.status}:${errorData.statusText}`);
        }
        throw new Error('Some error occurred');
    });
}

export function createBusiness(data) {
    return axios.post('/businesses', data);
  }
  
  export function updateBusiness(id, data) {
    return axios.put(`/businesses/${id}`, data, { 'Access-Control-Allow-Origin': '*' });
  }
  
  export function deleteBusiness(id) {
    return axios.delete(`/businesses/${id}`);
  }