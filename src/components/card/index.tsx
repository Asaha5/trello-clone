import * as React from "react";
import { TiArrowMove, TiEdit } from "react-icons/ti";
import TextInput from "../input-text";
import Button from "../button";
import Dropdown from "../dropdown";
import "./card.scss";

import type { ListType } from "../../core/types/index";

type CardProps = {
  listName: string;
  description: string;
  updateLists(): void;
};

const Card = (cardProps: CardProps) => {
  const { listName, description, updateLists } = cardProps;
  const listsInStorage = localStorage.getItem("lists");
  let listNames: Array<string> = [];
  if (listsInStorage) {
    listNames = JSON.parse(listsInStorage).map(
      ({ listLabel }: ListType) => listLabel
    );
  }

  const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);
  const [cardDescription, setDescription] = React.useState(description);
  const [oldCardDescription, setOldCardDescription] = React.useState(
    description
  );

  const [move, setMove] = React.useState<boolean>(false);
  const [destinationList, setDestinationList] = React.useState(listName);

  React.useEffect(() => {
    if (!isBeingEdited || !move) {
      if (listsInStorage) {
        const parsedData = JSON.parse(listsInStorage);
        if (listName !== destinationList) {
          const modifiedData = parsedData.map((list: ListType) => {
            const { listLabel, listCards } = list;
            if (listLabel === listName) {
              return {
                listLabel,
                listCards: listCards.filter(
                  ({ description }) => description !== cardDescription
                ),
              };
            } else if (listLabel === destinationList) {
              return {
                listLabel,
                listCards: [...listCards, { description: cardDescription }],
              };
            }
            return list;
          });
          localStorage.setItem("lists", JSON.stringify(modifiedData));
        } else {
          const modifiedData = parsedData.map((list: ListType) => {
            const { listLabel, listCards } = list;
            if (listName === listLabel) {
              let newListCards;
              if (
                listCards.find(
                  (listCard) => listCard.description === oldCardDescription
                )
              ) {
                newListCards = listCards.map((listCard) => {
                  if (listCard.description === oldCardDescription) {
                    return {
                      description: cardDescription,
                    };
                  }
                  return listCard;
                });
              } else {
                newListCards = [...listCards, { description: cardDescription }];
              }
              return {
                listLabel,
                listCards: newListCards,
              };
            }
            return list;
          });
          localStorage.setItem("lists", JSON.stringify(modifiedData));
        }

        updateLists();
      }
    }
  }, [isBeingEdited, move]);

  return (
    <div className="trello-clone-card-container">
      <div className="actions-header">
        <TiEdit
          onClick={(e) => {
            setOldCardDescription(cardDescription);
            setIsBeingEdited(!isBeingEdited);
          }}
        />
        <TiArrowMove
          onClick={(e) => {
            setMove(!move);
            setIsBeingEdited(false);
          }}
        />
        {move && (
          <Dropdown
            options={[
              "--select--",
              ...listNames.filter((name) => name !== listName),
            ]}
            onChange={({ target: { value } }) => {
              setDestinationList(value);
            }}
          />
        )}
      </div>
      <div className="description-container">
        {isBeingEdited ? (
          <TextInput
            type="textarea"
            onChange={({ target: { value } }) => {
              setDescription(value);
            }}
            value={cardDescription}
          />
        ) : (
          <span className="description">{cardDescription}</span>
        )}
      </div>
      {(isBeingEdited || move) && (
        <Button
          type="success"
          text="Done"
          onClick={(e) => {
            setIsBeingEdited(false);
            setMove(false);
          }}
        />
      )}
    </div>
  );
};

export default Card;
