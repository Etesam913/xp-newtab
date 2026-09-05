import type { KanbanItems, Setter } from "../../types";
import type { StyleProps } from "../../types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled, { css } from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import KanbanItem from "./KanbanItem";
import { useStore } from "../../Store";

function Column({
  items,
  setItems,
  id,
  margin,
}: {
  items: KanbanItems;
  setItems: Setter<KanbanItems>;
  id: string;
  margin: string;
}) {
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

    copyOfItems[id] = [
      ...copyOfItems[id],
      {
        id: greatestId + 1,
        text: "✨ This is your new item",
      },
    ];
    setItems(copyOfItems);
  }
  const columnValues = items[id].map((item) => item.text);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  return (
    <KanbanColumn margin={margin} windowsOS={settingsData["windowsOS"]}>
      <SortableContext
        items={items[id].map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ItemsContainer ref={setNodeRef}>
          {columnValues.map((text, index) => (
            <KanbanItem
              text={text}
              columnId={id}
              id={items[id][index].id}
              key={items[id][index].id}
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

const KanbanColumn = styled.div<StyleProps>`
  ${(props) =>
    props.windowsOS === 0 &&
    css`
      background-color: #f2eedc;
    `};

  ${(props) =>
    props.windowsOS === 1 &&
    css`
      background-color: #dddddd;
    `};

  ${(props) =>
    props.windowsOS === 2 &&
    css`
      background-color: #cbebf6;
    `};

  padding: 0 0.6rem;
  margin: ${(props) => props.margin};
`;

const ItemsContainer = styled.div<StyleProps>`
  max-height: 20rem;
  overflow-y: auto;
`;

const AddButtonContainer = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export default Column;
