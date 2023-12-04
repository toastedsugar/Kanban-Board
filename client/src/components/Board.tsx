'use client'
import { useState, useMemo, useReducer } from "react"
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
import { SortableContext } from "@dnd-kit/sortable";

import { createPortal } from "react-dom";
import { ListType, CardType } from "../types";
import List from "./List";
import Card from "./Card";
import { CARD_ACTION_TYPES, CardActionType, CardsReducer } from "../reducers/CardsReducer";
import { LIST_ACTION_TYPES, ListActionType, ListsReducer } from "../reducers/ListsReducer";

export default function Board() {
  const [lists, listDispatch] = useReducer(ListsReducer, [])
  const [cards, cardDispatch] = useReducer(CardsReducer, [])

  // IDs for all the lists on the board
  const ListIDs: string[] = useMemo(() => (
    lists?.map((list) => list.id)
  ), [lists])

  // The item that is being dragged
  const [activeList, setActiveList] = useState<ListType | null>(null)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)


  /***************************************************
   * List Methods */
  const CreateList = () => {
    const action: ListActionType = {
      type: LIST_ACTION_TYPES.ADD_LIST,
      payload: {}
    }
    listDispatch(action)
  }

  /***************************************************
   * Card Methods */
  const createCard = (listID: string) => {
    const action: CardActionType = {
      type: CARD_ACTION_TYPES.ADD_CARD,
      payload: {
        parentListID: listID
      }
    }
    cardDispatch(action)
  }
  const updateCard = () => { console.log("Updating card") }
  const deleteCard = () => { console.log("deleting card") }

  /**************************************************** */
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

    if (!activeCard) return     // Do nothing if a card isnt being dragged over anything

    // Handle dropping card over another card
    if (isActiveCard && isOverCard) {
      console.log("hovering over a card in current list")

      // Get the index in the cards array for the active and target cards
      const activeIndex: number = cards.findIndex((card: CardType) => card.id === activeID)     // Index of the original position
      const overIndex: number = cards.findIndex((card: CardType) => card.id === overID)         // Index of the destination position  

      // If the card is hovering over a card in another list, update the card's 
      // parent ID to reflect it's new parent list
      cards[activeIndex].parentListID = cards[overIndex].parentListID

      /** We are modifying state directly, this should be fixed later */
      /*
      setCards(cards => arrayMove(
        cards,
        activeIndex,
        overIndex
      ))
      */
      cardDispatch({
        type: CARD_ACTION_TYPES.SWAP_CARD,
        payload: {
          activeIndex: activeIndex,
          overIndex: overIndex
        }
      })
    }

    // Handle dropping a card into a different list
    const isOverList = over.data.current?.type === 'list'   // Is the card hovering over a list?

    if (isOverList && isActiveCard) {
      // Get the index in the cards array for the active and target cards
      const activeIndex: number = cards.findIndex((card: CardType) => card.id === activeID)     // Index of the original position

      cards[activeIndex].parentListID = String(overID)

      /**
       * 
      setCards(cards => arrayMove(
        cards,
        activeIndex,
        activeIndex
        ))
        */
      cardDispatch({
        type: CARD_ACTION_TYPES.SWAP_CARD,
        payload: {
          activeIndex: activeIndex,
          overIndex: activeIndex
        }
      })
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
    /*
    setLists(lists => arrayMove(
      lists,
      lists.findIndex((list: ListType) => list.id === activeListID),     // Index of the original position
      lists.findIndex((list: ListType) => list.id === overListID)        // Index of the destination position
    ))
    */
    const action: ListActionType = {
      type: LIST_ACTION_TYPES.SWAP_LIST,
      payload: {
        activeIndex: lists.findIndex((list: ListType) => list.id === activeListID),     // Index of the original position
        overIndex: lists.findIndex((list: ListType) => list.id === overListID)        // Index of the destination position
      }
    }
    listDispatch(action)

  }

  const RenderLists = () => {
    return lists.map((list: ListType) => (
      <List
        key={list.id}
        list={list}
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
      <div className="flex flex-cols overflow-y-auto">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className='flex flex-row gap-4 flex-none items-start'>
            {/** ALL the lists are rendered here */}
            <SortableContext items={ListIDs}>
              {RenderLists()}
            </SortableContext>
            {/** The button to create a new list is after all the lists are rendered */}
            <button 
            onClick={CreateList} 
            className="grow-0 bg-color-surface-mixed-200 w-36 py-4"
            >
              New List
              </button>
          </div>

          {/** The Drag overlay is the item that is being dragged. 
         * It is the one that is attached to the mouse and is hovering 
         * over the other lists, unlike the one that is on the board */}
          {createPortal(
            <DragOverlay>
              {activeList && (
                <List
                  list={activeList}
                  createCard={createCard}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                  cards={cards.filter((card: CardType) => card.parentListID === activeList.id)}
                />
              )}
              {activeCard && (
                <Card
                  card={activeCard}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  )
}

