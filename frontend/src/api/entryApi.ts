import axios from 'axios';

export const getNote = async (key: string) => {
    try {
        const response = await axios.get(`/api/note/${encodeURIComponent(key)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
};