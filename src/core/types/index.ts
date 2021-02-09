export type CardType = {
  description: string;
};

export type ListType = {
  listLabel: string;
  listCards: Array<CardType>;
};

export type TrelloContextValueType = {
  lists: ListType[];
  addOrUpdateListToContext(lists: ListType[]): void;
};
