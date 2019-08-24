import axios from 'axios';

export function login(name, password) {
    return axios.post('/auth', { name, password })
        .then(res => {
            const { userInfo } = res.data;
            localStorage.setItem('jwt_token', userInfo.token);
            localStorage.setItem('user_name', userInfo.name);
            localStorage.setItem('user_email', userInfo.email);
            localStorage.setItem('user_id', userInfo._id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
            return userInfo;
        })
}

export function addUser(user) {
    return axios.post('/users', user)
        .then(res => {
            const { data } = res;
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_name', data.name);
            localStorage.setItem('user_email', data.email);
            localStorage.setItem('user_id', data._id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
            return data;
        });
}

export function updateUser(user) {
    const { id, name, email } = user;
    return axios.put(`/users/${id}`, { name, email })
        .then(res => {
            const { data } = res;
            localStorage.setItem('user_name', data.name);
            localStorage.setItem('user_email', data.email);
            return data;
        });
}

export function updatePassword(user) {
    const { id, originalPassword, newPassword } = user;
    return axios.put(`/users/password/${id}`, { originalPassword, newPassword })
        .then(res => {
            const { data } = res;
            return data;
        });
}

export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    return Promise.resolve(null);
}

export function getToken() {
    return localStorage.jwt_token;
}

export function getUserID() {
    return localStorage.user_id;
}

export function getUserEmail() {
    return localStorage.user_email;
}

export function getUserName() {
    return localStorage.user_name;
}

export function loggedIn() {
    let token = getToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return !!token;
}



