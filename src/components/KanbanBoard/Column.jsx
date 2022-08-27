import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import KanbanItem from "./KanbanItem";
import { useStore } from "../../Store";

function Column({ items, setItems, id, margin }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  function addItem() {
    const copyOfItems = { ...items };
    copyOfItems[id].push("✨ This is your new item");
    setItems(copyOfItems);
  }
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  return (
    <KanbanColumn margin={margin}>
      <SortableContext items={items[id]} strategy={verticalListSortingStrategy}>
        <ItemsContainer ref={setNodeRef}>
          {items[id].map((value, index) => (
            <KanbanItem
              text={value}
              columnId={id}
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
  background-color: #f2eedc;
  padding: 0 0.6rem;
  margin: ${(props) => props.margin};
  border-radius: 0 0 0.15rem 0.15rem;
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
