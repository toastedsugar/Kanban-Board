import { Reducer } from "react";

import { CardType } from "../types";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";


export const CARD_ACTION_TYPES = {
    INIT_CARD: "INIT_CARD",
    ADD_CARD: "ADD_CARD",
    UPDATE_CARD: "UPDATE_CARD",
    SWAP_CARD: "SWAP_CARD",
    DELETE_CARD: "DELETE_CARD",
}

export type CardActionType = {
    type: string,
    payload: any
}

export const CardsReducer: Reducer<CardType[], CardActionType> = (state, action) => {
    switch (action.type) {
        case CARD_ACTION_TYPES.INIT_CARD:
            return action.payload

        case CARD_ACTION_TYPES.ADD_CARD:
            //console.log("Creating Card")
            const newCard: CardType = {
                id: nanoid(),
                parentListID: action.payload.parentListID,
                title: `Card ${state.length + 1}`
            }
            return [...state, newCard]

        case CARD_ACTION_TYPES.SWAP_CARD:
            //console.log("Swapping Card")

            return (arrayMove(
                state,
                action.payload.activeIndex,
                action.payload.overIndex
            ))
            return state;

        case CARD_ACTION_TYPES.UPDATE_CARD:
            //console.log("Updating Card")
            return state;

        case CARD_ACTION_TYPES.DELETE_CARD:
            //console.log("Deleting Card")
            return state;

        default:
            return state;
    }
}