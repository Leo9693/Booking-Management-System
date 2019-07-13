import axios from 'axios';

export function signup(name, email, password) {
    return axios.post('/users', {name, email, password}).then((res) => {
        console.log(res);
        const {token} = res.data;
        localStorage.setItem('jwt_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
        return res;
    });
}