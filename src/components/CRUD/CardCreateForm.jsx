import React, { useState } from 'react'
import { addCard } from '../../api/cards'

const CardCreateForm = ({ boardId, columnId, onCreated }) => {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) return

        try {
            const newCard = await addCard(boardId, columnId, { title })
            onCreated(newCard)
            setTitle('')
        } catch (err) {
            alert('Failed to create card: ' + err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
                className="p-1 rounded border dark:bg-gray-700 dark:text-white"
            />
            <button
                type="submit"
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
                Add
            </button>
        </form>
    )
}

export default CardCreateForm
