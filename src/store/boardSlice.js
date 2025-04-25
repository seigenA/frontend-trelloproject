import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as boardApi from '../api/boards'

export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
    return await boardApi.getBoards()
})

export const fetchBoardById = createAsyncThunk('boards/fetchById', async (id) => {
    const boards = await boardApi.getBoards()
    return boards.find((b) => b.id.toString() === id)
})

const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        list: [],
        current: null,
        loading: false,
        error: null
    },
    reducers: {
        setCurrentBoard(state, action) {
            state.current = action.payload
        },
        updateBoardInState(state, action) {
            const updated = action.payload
            state.current = updated
            state.list = state.list.map(b => b.id === updated.id ? updated : b)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchBoardById.fulfilled, (state, action) => {
                state.current = action.payload
            })
    }
})

export const { setCurrentBoard, updateBoardInState } = boardSlice.actions
export default boardSlice.reducer