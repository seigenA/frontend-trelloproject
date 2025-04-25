import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    createColumn,
    updateColumn,
    deleteColumn
} from '../store/columnSlice'
import {
    createCard,
    updateCard,
    deleteCard
} from '../store/cardsSlice'
import { fetchBoardById, updateBoardInState } from '../store/boardSlice'
import ColumnList from '../components/ColumnList'
import ColumnCreateForm from '../components/CRUD/ColumnCreateForm'


const BoardPage = () => {
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const board = useSelector(state => state.boards.current)

    useEffect(() => {
        dispatch(fetchBoardById(boardId))
    }, [dispatch, boardId])

    const handleBoardUpdated = (updatedColumns) => {
        const newBoard = { ...board, columns: updatedColumns }
        dispatch(updateBoardInState(newBoard));
    }
    const handleUpdateBoard = (newBoard) => {
        dispatch(updateBoardInState(newBoard))
    }

    const handleColumnCreated = (newColumn) => {
        const newBoard = {
            ...board,
            columns: [...(board.columns || []), { ...newColumn, cards: [] }]
        }
        dispatch(updateBoardInState(newBoard))
    }



    const handleColumnUpdated = (updatedColumn) => {
        dispatch(updateColumn({ board, updatedColumn }))
    }

    const handleColumnDeleted = (columnId) => {
        dispatch(deleteColumn({ board, columnId }))
    }


    const handleCardCreated = (columnId, newCard) => {
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.map((col) => {
            if (col.id === columnId) {
                return {
                    ...col,
                    cards: [...col.cards, newCard]
                }
            }
            return col
        })
        dispatch(updateBoardInState(newBoard))
    }


    const handleCardUpdated = (columnId, updatedCard) => {
        dispatch(updateCard({ board, columnId, updatedCard }))
    }

    const handleCardDeleted = (columnId, cardId) => {
        dispatch(deleteCard({ board, columnId, cardId }))
    }


    if (!board) return <p className="p-8 text-gray-500 dark:text-gray-300">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {board.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-200 mb-6">{board.description}</p>

            <ColumnCreateForm boardId={board.id} onCreated={handleColumnCreated} />

            {board.columns && (
                <ColumnList
                    columns={board.columns}
                    boardId={board.id}
                    onCardCreated={handleCardCreated}
                    onCardUpdated={handleCardUpdated}
                    onCardDeleted={handleCardDeleted}
                    onColumnUpdated={handleColumnUpdated}
                    onColumnDeleted={handleColumnDeleted}
                    setColumns={(newColumns) => handleBoardUpdated(newColumns)}
                />

            )}
        </div>
    )
}

export default BoardPage