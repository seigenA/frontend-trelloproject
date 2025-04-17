import React, { useState, useEffect } from 'react';
import { getBoard } from "../api/boards";
import Column from './Column';

const Board = ({ boardId }) => {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        getBoard(boardId)
            .then((data) => setBoard(data))
            .catch((error) => console.error("Error fetching board", error));
    }, [boardId]);

    const handleCardCreated = (columnId, card) => {
        const updatedBoard = { ...board };
        const column = updatedBoard.columns.find(c => c.id === columnId);
        column.cards.push(card);
        setBoard(updatedBoard);
    };

    const handleColumnUpdated = (updatedColumn) => {
        const updatedBoard = { ...board };
        updatedBoard.columns = updatedBoard.columns.map(c =>
            c.id === updatedColumn.id ? updatedColumn : c
        );
        setBoard(updatedBoard);
    };

    const handleColumnDeleted = (columnId) => {
        const updatedBoard = { ...board };
        updatedBoard.columns = updatedBoard.columns.filter(c => c.id !== columnId);
        setBoard(updatedBoard);
    };

    const handleCardUpdated = (updatedCard) => {
        const updatedBoard = { ...board };
        updatedBoard.columns.forEach(column => {
            column.cards = column.cards.map(c => c.id === updatedCard.id ? updatedCard : c);
        });
        setBoard(updatedBoard);
    };

    const handleCardDeleted = (cardId) => {
        const updatedBoard = { ...board };
        updatedBoard.columns.forEach(column => {
            column.cards = column.cards.filter(c => c.id !== cardId);
        });
        setBoard(updatedBoard);
    };

    if (!board) return <div>Loading...</div>;

    return (
        <div>
            {board.columns.map((column) => (
                <Column
                    key={column.id}
                    column={column}
                    boardId={boardId}
                    onCardCreated={handleCardCreated}
                    onColumnUpdated={handleColumnUpdated}
                    onColumnDeleted={handleColumnDeleted}
                />
            ))}
        </div>
    );
};

export default Board;
