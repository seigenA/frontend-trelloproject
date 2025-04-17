import React from 'react'
import { Link } from 'react-router-dom'

const BoardList = React.memo(function BoardList({ boards }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {boards.map((board) => (
                <Link
                    key={board.id}
                    to={`/board/${board.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        {board.title}
                    </h2>
                </Link>
            ))}
        </div>
    )
})

export default BoardList
