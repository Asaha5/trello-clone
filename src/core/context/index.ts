import React from "react";
import type { TrelloContextValueType } from "../types";

export const TrelloCloneContext = React.createContext<TrelloContextValueType>({
  lists: [],
  addOrUpdateListToContext: (lists) => {},
});
