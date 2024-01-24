import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { CardProps } from "../../types";

export default function Card({ card }: CardProps) {
    const [viewCard, setViewCard] = useState<boolean>(false)

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
        <section
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => setViewCard(true)}
            className={`${isDragging ? "bg-color-surface-mixed-600" : "bg-color-surface-mixed-400"} border-4 border-color-surface-mixed-400 hover:border-color-primary-600 p-1 w-full h-full z-10 select-none cursor-grab`}
        >
        {RenderCard()}
        </section>

    )
}