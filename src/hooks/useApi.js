import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const useApi = () => ({
    signin: async (payload) => {
        const response = await api.post('/auth/login', payload);
        return response;
    },
    getMe: async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.get('/auth/me', { headers });
        return response;
    },
    createAgent: async (payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.post('/agents', payload, { headers });
        return response;
    },
    getAllUsers: async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.get('/users', { headers });
        return response;
    },
    createUser: async (payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.post('/users', payload, { headers });
        return response;
    },
    editUser: async (id, payload) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.put(`/users/${id}`, payload, { headers });
        return response;
    },
    deleteUser: async (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await api.delete(`/users/${id}`, { headers });
        return response;
    }
});
