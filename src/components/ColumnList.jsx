import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";

const ColumnList = ({
                        columns,
                        boardId,
                        onCardCreated,
                        onCardUpdated,
                        onCardDeleted,
                        onColumnUpdated,
                        onColumnDeleted,
                        setColumns
                    }) => {
    const handleDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;
        if (!destination) return;

        if (type === "column") {
            const updatedColumns = Array.from(columns);
            const [removed] = updatedColumns.splice(source.index, 1);
            updatedColumns.splice(destination.index, 0, removed);
            setColumns(updatedColumns);
            return;
        }

        const sourceCol = columns.find(col => col.id.toString() === source.droppableId);
        const destCol = columns.find(col => col.id.toString() === destination.droppableId);
        const draggedCard = sourceCol.cards.find(c => c.id.toString() === draggableId);

        if (!draggedCard) return;

        if (sourceCol === destCol) {
            const updatedCards = Array.from(sourceCol.cards);
            updatedCards.splice(source.index, 1);
            updatedCards.splice(destination.index, 0, draggedCard);

            const updatedColumns = columns.map(col =>
                col.id === sourceCol.id ? { ...col, cards: updatedCards } : col
            );
            setColumns(updatedColumns);
        } else {
            const updatedSourceCards = sourceCol.cards.filter(card => card.id.toString() !== draggableId);
            const updatedDestCards = Array.from(destCol.cards);
            updatedDestCards.splice(destination.index, 0, draggedCard);

            const updatedColumns = columns.map(col => {
                if (col.id === sourceCol.id) return { ...col, cards: updatedSourceCards };
                if (col.id === destCol.id) return { ...col, cards: updatedDestCards };
                return col;
            });

            setColumns(updatedColumns);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        className="mt-6 flex gap-4 overflow-x-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {columns.map((col, index) => (
                            <Draggable draggableId={col.id.toString()} index={index} key={col.id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="w-80 flex-shrink-0"
                                    >
                                        <Column
                                            column={col}
                                            boardId={boardId}
                                            onCardCreated={onCardCreated}
                                            onCardUpdated={onCardUpdated}
                                            onCardDeleted={onCardDeleted}
                                            onColumnUpdated={onColumnUpdated}
                                            onColumnDeleted={onColumnDeleted}
                                            dragHandleProps={provided.dragHandleProps} // <==== передаём
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ColumnList;
