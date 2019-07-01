import axios from 'axios';

export function handleCreateNewClient(customerName, email, phone) {
    return axios.post('/customers', {customerName, email, phone})
                .then((res) => {
                    return res;
                });
}