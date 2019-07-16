import axios from 'axios';

const _transform = (Info, i) => {
  const fillData = [
    { cover: 'react.png', info: '' },
    { cover: 'restapi.jpeg', info: '' },
    { cover: 'cloud.jpeg', info: '' },
    { cover: 'all.png', info: '' }
  ];
  return {
    ...Info
  };
};

export function fetchInfo() {
  return axios.get('/customers').then(response => response.data);
}

export function createInfo(data) {
  return axios.post('/customers', data);
}

export function fetchInfoById(id) {
  return axios.get(`/customers/${id}`).then(response => response.data);
  // .catch(error => {
  //   if (error.response) {
  //     const errorData = error.response;
  //     throw new Error(`${errorData.status}:${errorData.statusText}`);
  //   }
  //   throw new Error('Some error occurred');
  // });
}

export function updateInfo(id, data) {
  return axios.put(`/customers/${id}`, data);
}

export function deleteInfo(id) {
  return axios.delete(`/customers/${id}`);
}
