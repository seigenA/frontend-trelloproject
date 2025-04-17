import React, { useState, useEffect } from 'react'

const ColumnEditForm = ({ column, onUpdated, onCancel }) => {
    const [title, setTitle] = useState(column.title)

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdated({ ...column, title })
    }

    useEffect(() => {
        setTitle(column.title)
    }, [column])

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Column Title
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

export default ColumnEditForm
