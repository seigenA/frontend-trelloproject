import axios from 'axios';

const API_URL = 'http://localhost:3005/boards';

export const getBoards = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createBoard = async (newBoard) => {
    try {
        const res = await axios.post(API_URL, {
            ...newBoard,
            columns: [],
        });
        return res.data;
    } catch (err) {
        throw new Error('Failed to create board');
    }
};

export const updateBoard = async (boardId, updatedData) => {
    const res = await axios.patch(`${API_URL}/${boardId}`, updatedData);
    return res.data;
};

export const deleteBoard = async (boardId) => {
    await axios.delete(`${API_URL}/${boardId}`);
};
