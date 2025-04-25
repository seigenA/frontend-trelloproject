import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoards } from '../store/boardSlice'

const BoardList = React.memo(function BoardList() {
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boards.list)
    const loading = useSelector((state) => state.boards.loading)
    const error = useSelector((state) => state.boards.error)

    useEffect(() => {
        dispatch(fetchBoards())
    }, [dispatch])

    if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

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
                    <p className="text-gray-500 dark:text-gray-300">{board.description}</p>
                </Link>
            ))}
        </div>
    )
})

export default BoardList