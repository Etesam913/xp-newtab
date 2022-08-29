import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import KanbanItem from "./KanbanItem";
import { useStore } from "../../Store";

function Column({ items, setItems, id, margin }) {
  const settingsData = useStore((state) => state.settingsData);
  const { setNodeRef } = useDroppable({
    id,
  });

  function addItem() {
    const copyOfItems = { ...items };
    let greatestId = 0;

    // have to get the greatest id out of every kanban item to prevent collisions
    const keys = Object.keys(copyOfItems);
    for (let i = 0; i < keys.length; i++) {
      const currentColumn = copyOfItems[keys[i]];
      for (let j = 0; j < currentColumn.length; j++) {
        if (currentColumn[j].id > greatestId) {
          greatestId = currentColumn[j].id;
        }
      }
    }

    copyOfItems[id].push({
      id: greatestId + 1,
      text: "✨ This is your new item",
    });
    setItems(copyOfItems);
  }
  const columnValues = items[id].map((item) => item.text);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  return (
    <KanbanColumn margin={margin} isWindowsXP={settingsData["isWindowsXP"]}>
      <SortableContext
        items={columnValues}
        strategy={verticalListSortingStrategy}
      >
        <ItemsContainer ref={setNodeRef}>
          {columnValues.map((text, index) => (
            <KanbanItem
              text={text}
              columnId={id}
              id={items[id][index].id}
              key={`item-${index}`}
              items={items}
              setItems={setItems}
              index={index}
            />
          ))}
        </ItemsContainer>
      </SortableContext>
      {isEditModeOn && (
        <AddButtonContainer>
          <button onClick={addItem}>Add Item</button>
        </AddButtonContainer>
      )}
    </KanbanColumn>
  );
}

const KanbanColumn = styled.div`
  background-color: ${(props) => (props.isWindowsXP ? "#f2eedc" : "#dddddd")};
  padding: 0 0.6rem;
  margin: ${(props) => props.margin};
`;

const ItemsContainer = styled.div`
  max-height: 20rem;
  overflow-y: auto;
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export default Column;
