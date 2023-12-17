import { Reducer } from "react";

export const VIEW_CARD_ACTION_TYPES = {
    VIEW_DETAILS: 'VIEW_DETAILS',
    CLOSE_DETAILS: 'CLOSE_DETAILS'
}

type ViewCardActionType = {
    type: string
}

export const CardsReducer: Reducer<boolean, ViewCardActionType> = (state, action) => {
    switch (action.type) {
        case VIEW_CARD_ACTION_TYPES.VIEW_DETAILS: return true
        case VIEW_CARD_ACTION_TYPES.CLOSE_DETAILS: return false
        default: return state;
    }
}