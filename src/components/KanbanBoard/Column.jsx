import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "../Window/SortableItem";

function Column({ items, id }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <KanbanColumn ref={setNodeRef}>
        {items.map((value) => (
          <SortableItem id={value} key={value}>
            <KanbanItem>{value} </KanbanItem>
          </SortableItem>
        ))}
      </KanbanColumn>
    </SortableContext>
  );
}

const KanbanColumn = styled.div`
  padding: 0.5rem;
`;

const KanbanItem = styled.div`
  border: 2px solid black;
`;

export default Column;
