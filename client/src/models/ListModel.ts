import CardModel from "./CardModel"

export default class ListModel {
    id: string
    title: string
    cards: CardModel[]
    
    constructor(id: string, title: string) {
        this.id = id
        this.title = title
        this.cards = []             // Initialize empty array when a list is created
    }
}