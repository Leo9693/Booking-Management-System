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
  return axios.get('/handyman').then(response => response.data.data);
}

export function createInfo(data) {
  return axios.post('/handyman', data);
}

export function fetchInfoById(id) {
  return axios.get(`/handyman/${id}`).then(response => response.data.data[0]);
  // .catch(error => {
  //   if (error.response) {
  //     const errorData = error.response;
  //     throw new Error(`${errorData.status}:${errorData.statusText}`);
  //   }
  //   throw new Error('Some error occurred');
  // });
}

export function updateInfo(id, data) {
  return axios.put(`/handyman/${id}`, data);
}

export function deleteInfo(id) {
  return axios.delete(`/handyman/${id}`);
}
