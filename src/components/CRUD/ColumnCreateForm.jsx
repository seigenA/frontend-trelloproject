import React, { useState } from 'react'
import { addColumn } from '../../api/columns'

const ColumnCreateForm = ({ boardId, onCreated }) => {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) return

        try {
            const newCol = await addColumn(boardId, { title })
            onCreated(newCol)
            setTitle('')
        } catch (err) {
            alert('Failed to create column: ' + err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New column title"
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
            />
            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Add Column
            </button>
        </form>
    )
}

export default ColumnCreateForm
