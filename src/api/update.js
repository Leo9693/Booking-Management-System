import axios from 'axios';

export function handleUpdateClient(customerName, email, phone, id) {
    return axios.put(`/customers/${id}`, {customerName, email, phone})
                .then((res) => {
                    return res;
                });
}