import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ListProps, CardProps, CardType, ListType } from "../types";
import { useMemo } from "react";

import Card from "./Card";

export default function List({ list, createCard, updateCard, deleteCard, cards }: ListProps) {
    const cardIDs = useMemo(() => {
        return cards.map((card: CardType) => card.id)
    }, [cards])

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
        <div className="flex gap-1 flex-col">
            <div className="flex gap-2">
                <div ref={setActivatorNodeRef} {...listeners} className="w-4 hover:bg-slate-700">0</div>
                <p>{list.title}</p>
            </div>
            <SortableContext items={cardIDs}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} card={card} />
                ))}
            </SortableContext>
            <button className="hover:bg-slate-700" onClick={() => { createCard(list.id) }}>+ New</button>
        </div>
    )

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <section ref={setNodeRef} style={style} {...attributes}  className='border w-24 p-2'>
            {/** If the list is being hovered, use the card's position on the board 
         * to indicate it's original position, otherwise render it as normal */}
            {isDragging ? <></> : RenderCards()}
        </section>
    )
}
