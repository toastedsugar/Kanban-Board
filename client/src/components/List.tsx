import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ListProps, CardProps, ListType, CardType } from "../types";
import { useMemo } from "react";

export default function List({ list, isOver, createCard, updateCard, deleteCard, cards }: ListProps) {
    const cardIDs = useMemo(() => {
        return cards.map((card: CardType) => card.id)
    }, [cards])

    const {
        attributes,
        listeners,
        setNodeRef,
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
            <p>{list.title}</p>
            <SortableContext items={cardIDs}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} card={card} isOver={false} />
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
        <section ref={setNodeRef} style={style} {...attributes} {...listeners} className='border w-24 p-2'>
            {/** If the list is being hovered, use the card's position on the board 
         * to indicate it's original position, otherwise render it as normal */}
            {isDragging ? <></> : RenderCards()}
        </section>
    )
}

export function Card({ card, isOver }: CardProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        data: {
            type: "card",
            card
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    const RenderCard = () => (
        <div>
            {card.title}
        </div>
    )
    return (
        <section ref={setNodeRef} style={style} {...attributes} {...listeners} className='border p-1 w-full h-full z-10'>
            {isDragging ? <>_</> : RenderCard()}
        </section>

    )
}