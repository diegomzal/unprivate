import axios from 'axios';
import { socket } from './socket';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: VITE_API_BASE_URL
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

export const saveNote = async (key: string, value: string) => {
    try {
        const socketId = socket.id;
        const response = await api.post(`/api/note/${encodeURIComponent(key)}`, { value, socketId });
        return response.data;
    } catch (error) {
        console.error('Error saving note:', error);
        throw error;
    }
};