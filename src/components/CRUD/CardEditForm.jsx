import React, { useState, useEffect } from 'react'

const CardEditForm = ({ card, onUpdated, onCancel }) => {
    const [title, setTitle] = useState(card.title)

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdated({ ...card, title })
    }

    useEffect(() => {
        setTitle(card.title)
    }, [card])

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Card Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:text-white dark:bg-gray-800"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default CardEditForm
