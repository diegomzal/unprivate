import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL
});

export const getNote = async (key: string) => {
    try {
        const response = await api.get(`/api/note/${encodeURIComponent(key)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
};

export const saveNote = async (key: string, text: string) => {
    try {
        const response = await api.post(`/api/note/${encodeURIComponent(key)}`, { value: text });
        return response.data;
    } catch (error) {
        console.error('Error saving note:', error);
        throw error;
    }
};