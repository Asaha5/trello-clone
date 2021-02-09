import React from "react";
import "./App.css";
import Button from "./components/button";
import TextInput from "./components/input-text";
import List from "./components/list";
import type { ListType } from "./core/types/index";

const getLists = () => {
  const listsFromStorage = localStorage.getItem("lists");
  if (listsFromStorage) {
    return JSON.parse(listsFromStorage);
  }
  return [];
};

function App() {
  const [isListBeingAdded, setIsListBeingAdded] = React.useState(false);
  const [listLabel, setListLabel] = React.useState("");
  const [lists, setLists] = React.useState<Array<ListType>>(getLists());
  const [storageEventBound, setStorageEventBound] = React.useState(false);

  const onListAdded = () => {
    setLists([
      ...lists,
      {
        listLabel,
        listCards: [],
      },
    ]);
    setIsListBeingAdded(false);
    setListLabel("");
  };

  const updateLists = () => {
    const listsFromStorage = localStorage.getItem("lists");
    if (listsFromStorage) {
      setLists(JSON.parse(listsFromStorage));
    }
  };

  React.useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="App">
      <header className="App-header">
        <span>Trello | Clone</span>
      </header>
      <div className="App-body">
        <div className="App-actions">
          <Button
            type="success"
            text={isListBeingAdded ? "Add List" : "Add a list"}
            onClick={(e) => {
              if (!isListBeingAdded) {
                setIsListBeingAdded(true);
                return;
              }
              onListAdded();
            }}
            disabled={isListBeingAdded && listLabel === ""}
          />
          {isListBeingAdded && (
            <TextInput
              type="text"
              onChange={({ target: { value } }) => {
                setListLabel(value);
              }}
              value={listLabel}
            />
          )}
        </div>
        <div className="App-lists">
          {lists.map(({ listLabel, listCards }, idx) => {
            return (
              <List
                key={`${listLabel}-${idx}`}
                label={listLabel}
                listCards={listCards}
                updateLists={updateLists}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
