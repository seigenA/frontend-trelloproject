import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {},
    reducers: {
        createCard: (state, action) => {
            const { board, columnId, newCard } = action.payload
            const column = board.columns.find(col => col.id === columnId)
            if (column) {
                column.cards.push(newCard)
            }
        },
        updateCard: (state, action) => {
            const { board, columnId, updatedCard } = action.payload
            const column = board.columns.find(col => col.id === columnId)
            if (column) {
                const index = column.cards.findIndex(card => card.id === updatedCard.id)
                if (index !== -1) {
                    column.cards[index] = updatedCard
                }
            }
        },
        deleteCard: (state, action) => {
            const { board, columnId, cardId } = action.payload
            const column = board.columns.find(col => col.id === columnId)
            if (column) {
                column.cards = column.cards.filter(card => card.id !== cardId)
            }
        }
    }
})

export const { createCard, updateCard, deleteCard } = cardsSlice.actions
export default cardsSlice.reducer
