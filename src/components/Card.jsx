import React, { useState } from 'react';
import { deleteCard, updateCard } from "../api/cards";
import CardEditForm from "../CRUD/CardEditForm";

const Card = ({ card, boardId, columnId, onUpdated, onDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditCard = (updatedCard) => {
        updateCard(boardId, columnId, updatedCard)
            .then(() => {
                onUpdated(updatedCard);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error updating card", error);
            });
    };

    const handleDeleteCard = () => {
        deleteCard(boardId, columnId, card.id)
            .then(() => {
                onDeleted(card.id);
            })
            .catch((error) => {
                console.error("Error deleting card", error);
            });
    };

    return (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded shadow-sm">
            {isEditing ? (
                <CardEditForm
                    card={card}
                    onUpdated={handleEditCard}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <>
                    <h3 className="font-medium text-gray-800 dark:text-white">{card.title}</h3>
                    <div className="space-x-2 mt-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteCard}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
