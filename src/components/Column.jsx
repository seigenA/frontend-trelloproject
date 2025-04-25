import React, { useState } from 'react';
import { deleteColumn, updateColumn } from "../api/columns";
import ColumnEditForm from "./CRUD/ColumnEditForm";
import CardCreateForm from "./CRUD/CardCreateForm";
import CardEditForm from "./CRUD/CardEditForm";
import { updateCard, deleteCard } from "../api/cards";
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({
                    column,
                    boardId,
                    onCardCreated,
                    onColumnUpdated,
                    onColumnDeleted,
                    dragHandleProps,
                }) => {
    const [isEditingColumn, setIsEditingColumn] = useState(false);
    const [editingCardId, setEditingCardId] = useState(null);

    const handleEditColumn = (updatedColumn) => {
        updateColumn(boardId, updatedColumn)
            .then(() => {
                onColumnUpdated(updatedColumn);
                setIsEditingColumn(false);
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

    const handleUpdateCard = (updatedCard) => {
        updateCard(boardId, column.id, updatedCard)
            .then(() => {
                const updatedCards = column.cards.map(card => card.id === updatedCard.id ? updatedCard : card);
                onColumnUpdated({ ...column, cards: updatedCards });
                setEditingCardId(null);
            })
            .catch((error) => {
                console.error("Error updating card", error);
            });
    };

    const handleDeleteCard = (cardId) => {
        deleteCard(boardId, column.id, cardId)
            .then(() => {
                const updatedCards = column.cards.filter(card => card.id !== cardId);
                onColumnUpdated({ ...column, cards: updatedCards });
            })
            .catch((error) => {
                console.error("Error deleting card", error);
            });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center">
                {isEditingColumn ? (
                    <ColumnEditForm
                        column={column}
                        onUpdated={handleEditColumn}
                        onCancel={() => setIsEditingColumn(false)}
                    />
                ) : (
                    <>
                        <h2
                            className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                            {...dragHandleProps}
                        >
                            {column.title}
                        </h2>

                        <div className="space-x-2">
                            <button
                                onClick={() => setIsEditingColumn(true)}
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

            {/* Droppable для карточек */}
            <Droppable droppableId={column.id.toString()} type="card">
                {(provided) => (
                    <ul
                        className="space-y-2 mb-2 min-h-[20px]"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {column.cards.map((card, index) => (
                            <Draggable key={card.id.toString()} draggableId={card.id.toString()} index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-sm"
                                    >
                                        {editingCardId === card.id ? (
                                            <CardEditForm
                                                card={card}
                                                onUpdated={handleUpdateCard}
                                                onCancel={() => setEditingCardId(null)}
                                            />
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-gray-800 dark:text-white">{card.title}</h3>
                                                <div className="space-x-2">
                                                    <button onClick={() => setEditingCardId(card.id)} className="text-blue-500">✏️</button>
                                                    <button onClick={() => handleDeleteCard(card.id)} className="text-red-500">❌</button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <CardCreateForm
                boardId={boardId}
                columnId={column.id}
                onCreated={(newCard) => onCardCreated(column.id, newCard)}
            />
        </div>
    );
};

export default Column;
