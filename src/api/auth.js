import axios from 'axios';

export function login(email, password) {
    return axios.post('/auth', { email, password })
        .then(res => {
            const { userInfo } = res.data;
            localStorage.setItem('jwt_token', userInfo.token);
            localStorage.setItem('user_name', userInfo.name);
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
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwt_token}`;
            return data;
        });
}
  
export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_name');
    return Promise.resolve(null);
}
  
  export function getToken() {
    return localStorage.jwt_token;
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
  
  
  
