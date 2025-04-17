import React from 'react'
import Column from './Column'

const ColumnList = ({ columns, boardId, onCardCreated }) => {
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {columns.map((col) => (
                <Column
                    key={col.id}
                    column={col}
                    boardId={boardId}
                    onCardCreated={onCardCreated}
                />
            ))}
        </div>
    )
}

export default ColumnList
