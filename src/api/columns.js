import axios from 'axios'

const API_URL = 'http://localhost:3005'

export const addColumn = async (boardId, column) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data
    const newColumn = { ...column, id: Date.now(), cards: [] }
    board.columns.push(newColumn)
    await axios.put(`${API_URL}/boards/${boardId}`, board)
    return newColumn
}

export const updateColumn = async (boardId, column) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data
    board.columns = board.columns.map(c => c.id === column.id ? column : c)
    await axios.put(`${API_URL}/boards/${boardId}`, board)
    return column
}

export const deleteColumn = async (boardId, columnId) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data
    board.columns = board.columns.filter(c => c.id !== columnId)
    await axios.put(`${API_URL}/boards/${boardId}`, board)
}
