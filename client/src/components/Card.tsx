import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { CardProps } from "../types";

export default function Card({ card }: CardProps) {

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
            className='bg-color-surface-mixed-400  p-1 w-full h-full z-10'
        >
            {isDragging ? <>_</> : RenderCard()}
        </section>

    )
}