import axios from 'axios';

export function fetchOrders(pageSize, page, key, searchType, sort) {
  return axios
    .get('/orders?pageSize=15?page=1', {})
    .then(response => { 
        const orders= response;
    
        return orders;

        })
}

export function fetchOrderById(id) {
  return axios
    .get(`/orders/${id}`)
    .then(response => {
        const order=response.data;      
        return order;
    })
    .catch(error => {
      if (error.response) {
        const errorData = error.response;
        throw new Error(`${errorData.status}: ${errorData.statusText}`);
      }
      throw new Error('Some error occurred');
    });
}

export function addNewOrder(data) {
  return axios.post('/orders', data);
}

export function updateOrder(id, data) {
  return axios.put(`/courses/${id}`, data, { 'Access-Control-Allow-Origin': '*' });
}

export function deleteOrder(id) {
  return axios.delete(`/orders/${id}`);
}