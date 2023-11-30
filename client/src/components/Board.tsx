'use client'
import { useState, useMemo } from "react"
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from "react-dom";

type ListProps = {
  list: any,
  isOver: boolean
}

type List = {
  id:string,
  title: string,
  items: string[]
}


export default function Board() {
  const [data, setData] = useState<List[]>([
    { id: "1", title: "Group 1", items: ["1", "2", "3"] },
    { id: "2", title: "Group 2", items: ["4", "5", "6"] },
    { id: "3", title: "Group 3", items: ["7", "8", "9"] }
  ])
  const ListIDs:string[] = useMemo(() => (
    data?.map((list) => list.id)
  ), [data])

  const [activeItem, setActiveItem] = useState<List | null>(null)

  const onDragStart = (event: any) => {
    console.log(event)
    if (event.active.data.current.type === "list") {
      setActiveItem(event.active.data.current.list)
      console.log(activeItem)
      return
    }
  }

  const onDragEnd = (event:any) => {
    const {active, over} = event
    console.log("active: ", active, "\nover: ", over)
    if(!over) return    // If we are not hovering over a valid object, do nothing

    // create copy of state
    // Create copy of card
    // Remove original card from array
    // Place the card into it's new position
    // Update state


    // set activeItem state to null
  }

  const RenderLists = () => {
    return data.map((list, index) => (
      <List key={list.id} list={list} isOver={false} />
    ))
  }
  return (
    <div>
      Title
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className='flex flex-row gap-2'>
          <SortableContext items={ListIDs}>
            {RenderLists()}
          </SortableContext>
        </div>

        {/** The Drag overlay is the item that is being dragged. 
         * It is the one that is attached to the mouse and is hovering 
         * over the other lists, unlike the one that is on the board */}
        {createPortal(
          <DragOverlay>
            {activeItem && (
              <List list={activeItem} isOver={false} />
            )}
          </DragOverlay>,
          document.body

        )}
      </DndContext>
    </div>
  )
}

function List({ list, isOver }: ListProps) {
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
    <div>
      <p>{list.title}</p>
     {list.items.map((card: any) => (
       <div key={card} className='flex gap-1 flex-col'>
        <Card />
      </div>
    ))}
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

function Card() {
  return (
    <section className='border'>
      Card
    </section>
  )
}