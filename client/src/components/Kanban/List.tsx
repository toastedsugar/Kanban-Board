import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ListProps, CardType } from "../../types";
import { useMemo } from "react";

import Card from "./Card";

export default function List({ list, createCard, updateCard, deleteCard, cards }: ListProps) {
    const cardIDs = useMemo(() => {
        return cards.map((card: CardType) => card.id)
    }, [cards])

    // Only calling these to fix build issues
    updateCard("dfa")
    deleteCard("dfa")


    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: list.id,
        data: {
            type: "list",
            list
        }
    });

    const RenderCards = () => (
        <div className="flex gap-1.5 flex-col">
            <div ref={setActivatorNodeRef} {...listeners} className="flex gap-2 bg-color-surface-100 p-2 select-none cursor-grab">
                <span className="material-symbols-outlined">
                    drag_indicator
                </span>
                <p className="">{list.title}</p>
            </div>
            <SortableContext items={cardIDs}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} card={card} />
                ))}
            </SortableContext>
            <button
                className="flex gap-2 justify-center hover:bg-color-surface-mixed-300"
                onClick={() => { createCard(list.id) }}
            >
                <span className="material-symbols-outlined">add_circle</span> Card
            </button>
        </div>
    )

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <section ref={setNodeRef} style={style} {...attributes} className={`bg-color-surface-mixed-200 w-56 p-3 ${isDragging ? "brightness-200" : ""}`}>
            {/** If the list is being hovered, use the card's position on the board 
         * to indicate it's original position, otherwise render it as normal */}
            {RenderCards()}
        </section>
    )
}
