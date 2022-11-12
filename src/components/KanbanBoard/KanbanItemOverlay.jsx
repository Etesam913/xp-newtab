import { DragOverlay } from "@dnd-kit/core";
import styled, { css } from "styled-components";
import { useStore } from "../../Store";

function KanbanItemDragOverlay({ activeId, items, width }) {
  const settingsData = useStore((state) => state.settingsData);
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
  console.log(settingsData["windowsOS"]);

  return (
    <DragOverlay>
      {activeId && (
        <KanbanItemContainer
          windowsOS={settingsData["windowsOS"]}
          width={width + "px"}
        >
          {getText()}
        </KanbanItemContainer>
      )}
    </DragOverlay>
  );
}

const KanbanItemContainer = styled.div`
  display: flex;
  align-items: center;

  ${(props) =>
    props.windowsOS === 0 &&
    css`
      background-color: #d5d1c1;
    `};

  ${(props) =>
    props.windowsOS === 1 &&
    css`
      background-color: #bdbdbd;
    `};
  opacity: 0.6;
  padding: 0.35rem;
  font-size: 0.8rem;
  white-space: pre-wrap;
  width: ${(props) => props.width};
  transform: rotate(-4deg);
`;

export default KanbanItemDragOverlay;
