import axios from 'axios';

const api = axios.create({
    baseURL: 'https://menumaster-api.vercel.app/',
    timeout: 10000,
});

export default api;
