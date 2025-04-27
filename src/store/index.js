import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './boardSlice'
import columnsReducer from './columnSlice'
import cardsReducer from './cardsSlice'
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        boards: boardsReducer,
        columns: columnsReducer,
        cards: cardsReducer,
        auth: authReducer,
    },
})

export default store