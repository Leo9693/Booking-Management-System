import axios from 'axios';

export function login(email, password) {
    return axios.post('/auth', {email, password}).then(res => {
        const {token} = res.data.userInfo;

        localStorage.setItem('jwt_token', token);
        // const data = res.data.data;
        // localStorage.setItem('jwt_token', data.token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
        return token;
    })
}

export function logout(name, password) {
    localStorage.removeItem('jwt_token');
    return Promise.resolve(null);
}

export function loggedIn() {
    let token = localStorage.jwt_token;
    
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
    }
    return !!token; // return token? true: false;
}