import React, { useEffect, useState } from 'react'
import BoardList from '../components/BoardList'
import { getBoards, deleteBoard } from '../api/boards'
import BoardCreateForm from '../components/CRUD/BoardCreateForm'
import BoardEditForm from '../components/CRUD/BoardEditForm'

const HomePage = () => {
    const [boards, setBoards] = useState([])
    const [editingBoard, setEditingBoard] = useState(null)

    useEffect(() => {
        fetchAllBoards()
    }, [])

    const fetchAllBoards = async () => {
        try {
            const data = await getBoards()
            setBoards(data)
        } catch (err) {
            alert(err.message)
        }
    }

    const handleBoardCreated = (newBoard) => {
        setBoards([...boards, newBoard])
    }

    const handleBoardUpdated = (updated) => {
        setBoards(boards.map((b) => (b.id === updated.id ? updated : b)))
        setEditingBoard(null)
    }

    const handleDeleteBoard = async (id) => {
        if (!window.confirm('Are you sure you want to delete this board?')) return
        try {
            await deleteBoard(id)
            setBoards(boards.filter((b) => b.id !== id))
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
                Boards
            </h1>

            <div className="mb-6">
                <BoardCreateForm onCreated={handleBoardCreated} />
            </div>

            <BoardList boards={boards} />

            <ul className="mt-6 space-y-2">
                {boards.map((board) => (
                    <li key={board.id} className="text-gray-800 dark:text-gray-200">
                        {board.title}{' '}
                        <button
                            onClick={() => setEditingBoard(board)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteBoard(board.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {editingBoard && (
                <div className="mt-6">
                    <BoardEditForm board={editingBoard} onUpdated={handleBoardUpdated} />
                </div>
            )}
        </div>
    )
}

export default HomePage
