import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token_invictus');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token_invictus');
      localStorage.removeItem('email_invictus');
      localStorage.removeItem('username_invictus');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
export default api;
