import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBoards } from '../api/boards'
import ColumnList from '../components/ColumnList'
import ColumnCreateForm from '../components/CRUD/ColumnCreateForm'

const BoardPage = () => {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)

    useEffect(() => {
        fetchBoard()
    }, [boardId])

    const fetchBoard = async () => {
        try {
            const boards = await getBoards()
            const found = boards.find((b) => b.id.toString() === boardId)
            setBoard(found)
        } catch (err) {
            alert(err.message)
        }
    }

    const handleColumnCreated = (newColumn) => {
        setBoard((prev) => ({
            ...prev,
            columns: [...(prev.columns || []), { ...newColumn, cards: [] }]
        }))
    }

    const handleCardCreated = (columnId, newCard) => {
        setBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col.id === columnId
                    ? { ...col, cards: [...col.cards, newCard] }
                    : col
            )
        }))
    }

    if (!board) {
        return <p className="p-8 text-gray-500 dark:text-gray-300">Loading...</p>
    }

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
                />
            )}
        </div>
    )
}

export default BoardPage
