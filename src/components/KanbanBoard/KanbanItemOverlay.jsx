import { DragOverlay } from "@dnd-kit/core";
import styled from "styled-components";

function KanbanItemDragOverlay({ activeId, items, width }) {
  function getText() {
    const itemsArrays = Object.values(items);
    for (let i = 0; i < itemsArrays.length; i++) {
      for (let j = 0; j < itemsArrays[i].length; j++) {
        if (itemsArrays[i][j].id === activeId) {
          return itemsArrays[i][j].text;
        }
      }
    }
  }

  return (
    <DragOverlay>
      {activeId && (
        <KanbanItemContainer width={width + "px"}>
          {getText()}
        </KanbanItemContainer>
      )}
    </DragOverlay>
  );
}

const KanbanItemContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #d5d1c1;
  opacity: 0.6;
  padding: 0.35rem;
  font-size: 0.8rem;
  white-space: pre-wrap;
  width: ${(props) => props.width};
  transform: rotate(-4deg);
`;

export default KanbanItemDragOverlay;
