import axios from 'axios';
export function fetchOrders(fieldValue) {  
  if (!fieldValue) {
  return axios
    .get('/orders?pageSize=10', {})
    .then(response => { 
        const orders= response.data;       
        return orders;
        })}
        else {
          const {page, pageSize, key, sort, searchType} = fieldValue;
          console.log(pageSize);
          return axios
            .get('/orders', {params:{page, pageSize, key, sort, searchType}})
                .then(response => { 
                const orders= response.data;
                return orders;
              })
        }
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