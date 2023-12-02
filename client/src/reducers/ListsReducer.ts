import { Reducer } from "react";

import { CardType, ListType } from "../types";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";


export const ACTION_TYPES = {
    ADD_LIST: "ADD_LIST",
    UPDATE_LIST: "UPDATE_LIST",
    SWAP_LIST: "SWAP_LIST",
    DELETE_LIST: "DELETE_LIST",
}

// Create a card
type CreateListActionType = {
    type: string,
    payload: {
        parentListID: string
    }
}

// Update a list's title . It should get a card as input
type UpdateListActionType = {
    type: string,
    payload: {
        id: string,
        newTitle: string
    }
}

type SwapListActionType = {
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

export const CardsReducer: Reducer<CardType[], any> = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_LIST:
            console.log("Creating List")
            return state

        case ACTION_TYPES.UPDATE_LIST:
            console.log("Updating List")
            return state

        case ACTION_TYPES.SWAP_LIST:
            console.log("Swapping List")
            return state

        case ACTION_TYPES.DELETE_LIST:
            console.log("Deleting List")
            return state


        default:
            return state;
    }
}