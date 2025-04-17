import React, { useState } from 'react';
import { deleteColumn, updateColumn } from "../api/columns";
import ColumnEditForm from "./CRUD/ColumnEditForm";
import CardCreateForm from "./CRUD/CardCreateForm";

const Column = ({ column, boardId, onCardCreated, onColumnUpdated, onColumnDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditColumn = (updatedColumn) => {
        updateColumn(boardId, updatedColumn)
            .then(() => {
                onColumnUpdated(updatedColumn);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error updating column", error);
            });
    };

    const handleDeleteColumn = () => {
        deleteColumn(boardId, column.id)
            .then(() => {
                onColumnDeleted(column.id);
            })
            .catch((error) => {
                console.error("Error deleting column", error);
            });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <ColumnEditForm
                        column={column}
                        onUpdated={handleEditColumn}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {column.title}
                        </h2>
                        <div className="space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteColumn}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>

            <ul className="space-y-2 mb-2">
                {column.cards.map((card) => (
                    <li key={card.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-sm">
                        <h3 className="font-medium text-gray-800 dark:text-white">{card.title}</h3>
                    </li>
                ))}
            </ul>

            <CardCreateForm boardId={boardId} columnId={column.id} onCreated={onCardCreated} />
        </div>
    );
};

export default Column;
