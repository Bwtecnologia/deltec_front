import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const useApi = () => ({
    signin: async (payload) => {
        const response = await api.post('/users/login', payload);
        return response;
    },
    getMe: async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.get('/users/me', { headers });
        return response;
    },
    createAgent: async (payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.post('/agents', payload, { headers });
        return response;
    }
});
