import { Reducer } from "react";

import { ListType } from "../types";
import { arrayMove } from "@dnd-kit/sortable";


export const LIST_ACTION_TYPES = {
    ADD_LIST: "ADD_LIST",
    UPDATE_LIST: "UPDATE_LIST",
    SWAP_LIST: "SWAP_LIST",
    DELETE_LIST: "DELETE_LIST",
}

/*
// Create a card
export type CreateListActionType = {
    type: string,
    payload:any
}

// Update a list's title . It should get a card as input
type UpdateListActionType = {
    type: string,
    payload: {
        id: string,
        newTitle: string
    }
}

export type SwapListActionType = {
    type: string,
    payload: {
        activeIndex: number,
        overIndex: number
    }
}

type DeleteListActionType = {
    type: string,
    payload: string
}

type ListActionType = CreateListActionType
    | UpdateListActionType
    | SwapListActionType
    | DeleteListActionType
*/

export type ListActionType = {
    type: string,
    payload: any
}

export const ListsReducer: Reducer<ListType[], ListActionType> = (state, action) => {
    switch (action.type) {
        case LIST_ACTION_TYPES.ADD_LIST:
            console.log("Creating List")
            const newList: ListType = {
                id: String(state.length + 1),
                title: `List ${state.length + 1}`
            }
            return [...state, newList]

        case LIST_ACTION_TYPES.UPDATE_LIST:
            console.log("Updating List")
            return state

        case LIST_ACTION_TYPES.SWAP_LIST:
            console.log("Swapping List")
            return (arrayMove(
                state,
                action.payload.activeIndex,
                action.payload.overIndex
            ))

        case LIST_ACTION_TYPES.DELETE_LIST:
            console.log("Deleting List")
            return state


        default:
            return state;
    }
}