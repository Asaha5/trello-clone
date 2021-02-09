import * as React from "react";
import Button from "../button";
import Card from "../card";
import TextInput from "../input-text";
import "./list.scss";

import type { ListType, CardType } from "../../core/types/index";

type ListProps = {
  label: string;
  updateLists(): void;
  listCards: Array<CardType>;
};

const List = ({ label, updateLists, listCards = [] }: ListProps) => {
  const [isCardBeingAdded, setIsCardBeingAdded] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [cards, setCards] = React.useState<Array<CardType>>(listCards);

  const onCardAdded = () => {
    setCards([
      ...cards,
      {
        description,
      },
    ]);
    setIsCardBeingAdded(false);
    setDescription("");
  };

  React.useEffect(() => {
    setCards(listCards);
    const listsInStorage = localStorage.getItem("lists");
    if (listsInStorage) {
      const parsedData = JSON.parse(listsInStorage);
      const modifiedData = parsedData.map((list: ListType) => {
        const { listLabel } = list;
        if (label === list.listLabel) {
          return {
            listLabel,
            listCards: cards,
          };
        }
        return list;
      });
      localStorage.setItem("lists", JSON.stringify(modifiedData));
    }
  }, [cards, listCards]);

  return (
    <div className="trello-clone-list-container">
      <div className="list-header">
        <h4>{label}</h4>
      </div>
      <div className="cards-container">
        {cards.map(({ description }, idx) => {
          return (
            <Card
              key={`${description}-${idx}`}
              listName={label}
              description={description}
              updateLists={updateLists}
            />
          );
        })}
      </div>
      <div className="actions-container">
        {isCardBeingAdded && (
          <TextInput
            type="textarea"
            onChange={({ target: { value } }) => {
              setDescription(value);
            }}
            value={description}
          />
        )}
        <div className="actions">
          <Button
            type="info"
            text={isCardBeingAdded ? "Add card" : "Add a card"}
            onClick={(e) => {
              if (!isCardBeingAdded) {
                setIsCardBeingAdded(true);
                return;
              }
              onCardAdded();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
