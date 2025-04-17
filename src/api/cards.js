import axios from 'axios'

const API_URL = 'http://localhost:3005'

export const addCard = async (boardId, columnId, card) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data
    const newCard = { ...card, id: Date.now() }

    const column = board.columns.find(c => c.id === columnId)
    column.cards.push(newCard)

    await axios.put(`${API_URL}/boards/${boardId}`, board)
    return newCard
}

export const updateCard = async (boardId, columnId, card) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data

    const column = board.columns.find(c => c.id === columnId)
    column.cards = column.cards.map(c => c.id === card.id ? card : c)

    await axios.put(`${API_URL}/boards/${boardId}`, board)
    return card
}

export const deleteCard = async (boardId, columnId, cardId) => {
    const boardRes = await axios.get(`${API_URL}/boards/${boardId}`)
    const board = boardRes.data

    const column = board.columns.find(c => c.id === columnId)
    column.cards = column.cards.filter(c => c.id !== cardId)

    await axios.put(`${API_URL}/boards/${boardId}`, board)
}
