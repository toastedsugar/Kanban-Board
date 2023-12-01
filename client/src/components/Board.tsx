'use client'
import { useState, useMemo } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { createPortal } from "react-dom";
import { ListType, CardType } from "../types";
import List, { Card } from "./List";
import { nanoid } from "nanoid";


export default function Board() {
  /*
    const [data, setData] = useState<ListType[]>([
      { id: "1", title: "Group 1" },
      { id: "2", title: "Group 2" },
      { id: "3", title: "Group 3" }
    ])
  
    const [cards, setCards] = useState<CardType[]>([
      { id: "1", parentListID: "1", title: "card" }, { id: "2", parentListID: "1", title: "card" }, { id: "3", parentListID: "1", title: "card" },
      { id: "4", parentListID: "2", title: "card" }, { id: "5", parentListID: "2", title: "card" }, { id: "6", parentListID: "2", title: "card" },
      { id: "7", parentListID: "3", title: "card" }, { id: "8", parentListID: "3", title: "card" }, { id: "9", parentListID: "3", title: "card" }
    ])
    */
  const [data, setData] = useState<ListType[]>([])
  const [cards, setCards] = useState<CardType[]>([])

  // IDs for all the lists on the board
  const ListIDs: string[] = useMemo(() => (
    data?.map((list) => list.id)
  ), [data])

  // The item that is being dragged
  const [activeList, setActiveList] = useState<ListType | null>(null)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)


  /** List Methods */
  const CreateList = () => {
    const newList: ListType = {
      id: String(data.length + 1),
      title: `List ${data.length + 1}`
    }
    setData([...data, newList])
  }

  /** Card Methods */
  const createCard = (listID: string) => {
    console.log("Creating card")
    const newCard: CardType = {
      id: nanoid(),
      parentListID: listID,
      title: `Card ${cards.length + 1}`
    }
    setCards([...cards, newCard])
  }
  const updateCard = (listID: string) => {
    console.log("Updating card")
  }
  const deleteCard = (listID: string) => {
    console.log("Deleting card")
  }

  // Configuring sensors 
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    // Otherwise it won't be able to tell the difference between a click and drag
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor)


  // Handling drag events 
  const onDragStart = (event: DragStartEvent) => {
    // If a list is being dragged
    console.log(event)
    if (event.active.data.current?.type === "list") {
      //console.log("dragging list")
      setActiveList(event.active.data.current?.list)
      //console.log(activeList)
      return
    }

    // If a card is being dragged
    if (event.active.data.current?.type === "card") {
      console.log("dragging card")
      setActiveCard(event.active.data.current.card)
      console.log(activeCard)
      return
    }
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    console.log("OVER\n", "active: ", active, "\nover: ", over)

    if (!over) return    // If we are not hovering over a valid object, do nothing

    const activeID = active.id
    const overID = over.id

    if (activeID === overID) return     // We hovering over the list that it's already in so no need to swap

    const isActiveCard = active.data.current?.type === 'card'
    const isOverCard = over.data.current?.type === 'card'

    if( !activeCard) return     // Do nothing if a card isnt being dragged over anything

    // Handle dropping card over another card
    if (isActiveCard && isOverCard) {
      console.log("hovering over a card in current list")

      // Get the index in the cards array for the active and target cards
      const activeIndex = cards.findIndex((card: CardType) => card.id === activeID)     // Index of the original position
      const overIndex = cards.findIndex((card: CardType) => card.id === overID)         // Index of the destination position  

      // If the card is hovering over a card in another list, update the card's 
      // parent ID to reflect it's new parent list
      cards[activeIndex].parentListID = cards[overIndex].parentListID

      /** We are modifying state directly, this should be fixed later */
      setCards(cards => arrayMove(
        cards,
        activeIndex,
        overIndex
      ))
    }

    // Handle dropping a card into a different list
    const isOverList = over.data.current?.type === 'list'   // Is the card hovering over a list?

    if (isOverList && isActiveCard) {
      // Get the index in the cards array for the active and target cards
      const activeIndex = cards.findIndex((card: CardType) => card.id === activeID)     // Index of the original position
    
      cards[activeIndex].parentListID = String(overID)

      setCards(cards => arrayMove(
        cards,
        activeIndex,
        activeIndex
      ))
    }

  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveList(null)
    setActiveCard(null)

    const { active, over } = event
    //console.log("active: ", active, "\nover: ", over)
    if (!over) return    // If we are not hovering over a valid object, do nothing

    const activeListID = active.id
    const overListID = over.id

    if (activeListID === overListID) return     // We hovering over the list that it's already in so no need to swap

    // Update state to reflect the items being moved
    setData(data => arrayMove(
      data,
      data.findIndex((list: ListType) => list.id === activeListID),     // Index of the original position
      data.findIndex((list: ListType) => list.id === overListID)        // Index of the destination position
    ))

  }

  const RenderLists = () => {
    return data.map((list: ListType, index: number) => (
      <List
        key={list.id}
        list={list}
        isOver={false}
        createCard={createCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
        cards={cards.filter((card: CardType) => card.parentListID === list.id)}
      />
    ))
  }
  return (
    <div>
      Title
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className='flex flex-row gap-2'>
          <SortableContext items={ListIDs}>
            {RenderLists()}
          </SortableContext>
          <button onClick={CreateList} className="self-start border p-2 hover:bg-slate-700">New List</button>
        </div>

        {/** The Drag overlay is the item that is being dragged. 
         * It is the one that is attached to the mouse and is hovering 
         * over the other lists, unlike the one that is on the board */}
        {createPortal(
          <DragOverlay>
            {activeList && (
              <List
                list={activeList}
                isOver={false}
                createCard={createCard}
                updateCard={updateCard}
                deleteCard={deleteCard}
                cards={cards.filter((card: CardType) => card.parentListID === activeList.id)}
              />
            )}
            {activeCard && (
              <Card
                card={activeCard}
                isOver={false}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

