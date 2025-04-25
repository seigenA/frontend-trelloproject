import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as columnApi from '../api/columns'
import { updateBoardInState } from './boardSlice'

export const createColumn = createAsyncThunk(
    'columns/create',
    async ({ board, newColumn }, { dispatch }) => {
        const savedColumn = await columnApi.createColumn(board.id, newColumn)
        const updatedBoard = {
            ...board,
            columns: [...(board.columns || []), { ...savedColumn, cards: [] }]
        }

        dispatch(updateBoardInState(updatedBoard))
        return savedColumn
    }
)

export const updateColumn = createAsyncThunk(
    'columns/update',
    async ({ board, updatedColumn }, { dispatch }) => {
        const savedColumn = await columnApi.updateColumn(board.id, updatedColumn)

        const updatedColumns = board.columns.map(col =>
            col.id === savedColumn.id ? savedColumn : col
        )
        dispatch(updateBoardInState({ ...board, columns: updatedColumns }))
        return savedColumn
    }
)

export const deleteColumn = createAsyncThunk(
    'columns/delete',
    async ({ board, columnId }, { dispatch }) => {
        await columnApi.deleteColumn(board.id, columnId)

        const updatedColumns = board.columns.filter(col => col.id !== columnId)
        dispatch(updateBoardInState({ ...board, columns: updatedColumns }))
        return columnId
    }
)

const columnSlice = createSlice({
    name: 'columns',
    initialState: { loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(action => action.type.startsWith('columns/'), (state, action) => {
                if (action.type.endsWith('/pending')) state.loading = true
                if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
                    state.loading = false
                    state.error = action.error?.message || null
                }
            })
    }
})

export default columnSlice.reducer