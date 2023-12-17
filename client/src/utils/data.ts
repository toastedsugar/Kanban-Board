import { nanoid } from "nanoid";
import { CardType, ListType } from "../types";
export const ListData:ListType[] = [
    {id: "1", title: "About this board"},
    {id: "2", title: "Future features"},
    {id: "3", title: "Known issues"}
]

export const CardData: CardType[] = [
    // About this board
    {id: nanoid(), parentListID: "1", title: "This board was created to demonstrate by abilities with React and Javascript"},
    // Future features
    {id: nanoid(), parentListID: "2", title: "User authentication allowing users to have boards associated with their accounts"},
    {id: nanoid(), parentListID: "2", title: "Role based authentication allowing users to share boards"},
    {id: nanoid(), parentListID: "2", title: "Adding a routing system"},
    {id: nanoid(), parentListID: "2", title: "Create a sample bug tracker"},
    // Known issues
    {id: nanoid(), parentListID: "3", title: "The shadow containers for a given list change size when dragging it to a new location."},
]
