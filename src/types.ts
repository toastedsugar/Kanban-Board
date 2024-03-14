export type ListType = {
  id: string;
  title: string;
};

// Type for the card as it appears on the board
export type CardType = {
  id: string;
  parentListID: string;
  title: string;
};

// Type for the card when it is expanded into a full modal view
export type CardDetailsType = {
  id: string;
  parentListID: string;
  title: string;
  content: any;
};

export type ListProps = {
  list: ListType;
  createCard: (listID: string) => void;
  updateCard: (listID: string) => void;
  deleteCard: (listID: string) => void;
  cards: CardType[];
};

export type CardProps = {
  card: CardType;
};

export type Error = {
  code: number;
  message: string;
};
