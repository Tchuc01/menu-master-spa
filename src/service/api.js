import axios from 'axios';

const api = axios.create({
    baseURL: 'https://menumaster-api.vercel.app/',
    timeout: 10000,
    headers: {},
});

export default api;
