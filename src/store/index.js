import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './boardSlice'
import columnsReducer from './columnSlice'
import cardsReducer from './cardsSlice'

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        columns: columnsReducer,
        cards: cardsReducer,
    },
})

export default store