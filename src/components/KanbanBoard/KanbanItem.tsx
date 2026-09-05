import type { KanbanItems, Setter } from "../../types";
import type { StyleProps } from "../../types";
import DragIndicator from "../DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import styled, { css } from "styled-components";
import { useStore } from "../../Store";

function KanbanItem({
  columnId,
  text = "🐛 🐛 🐛",
  items,
  setItems,
  index,
  id,
}: {
  columnId: string;
  text: string;
  items: KanbanItems;
  setItems: Setter<KanbanItems>;
  index: number;
  id: number;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } =
    useSortable({
      id: id,
    });
  const settingsData = useStore((state) => state.settingsData);
  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  function updateKanbanItem(text: string) {
    const copyOfItems = { ...items };
    copyOfItems[columnId] = copyOfItems[columnId].map((item) =>
      item.id === id ? { ...item, text } : item,
    );
    setItems(copyOfItems);
  }

  function deleteKanbanItem() {
    const copyOfItems = { ...items };
    copyOfItems[columnId] = copyOfItems[columnId].filter(
      (item) => item.id !== id,
    );
    setItems(copyOfItems);
  }

  return (
    <KanbanItemContainer
      ref={setNodeRef}
      style={style}
      windowsOS={settingsData["windowsOS"]}
    >
      {isEditModeOn ? (
        <div style={{ width: "100%" }}>
          <KanbanTextArea
            value={items[columnId][index].text}
            onChange={(e) => updateKanbanItem(e.target.value)}
          />
          <DeleteButton onClick={deleteKanbanItem}>Delete Item</DeleteButton>
        </div>
      ) : (
        <TextContainer>{text}</TextContainer>
      )}

      <DragHandle
        style={{ padding: 0 }}
        isEditModeOn={true}
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <DragIndicator />
      </DragHandle>
    </KanbanItemContainer>
  );
}

const KanbanItemContainer = styled.div<StyleProps>`
  display: flex;
  margin: 0.5rem 0;
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

  ${(props) =>
    props.windowsOS === 2 &&
    css`
      background-color: #acd2e0;
    `};
`;

const TextContainer = styled.p<StyleProps>`
  width: calc(100% - 1.5rem);
  padding: 0.35rem;
  font-size: 0.8rem;
  white-space: pre-wrap;
`;

const KanbanTextArea = styled.textarea<StyleProps>`
  font-size: 0.8rem;
  border: 1px solid rgb(127, 157, 185);
  width: 100%;
  resize: vertical;
`;

const DragHandle = styled.button<StyleProps>`
  border: 0 !important;
  background: transparent !important;
  display: ${(props) => (!props.isEditModeOn ? "none" : "flex")};
  padding: 0;
  box-shadow: none !important;
  align-items: center;
  margin-right: 0.2rem;
`;

const DeleteButton = styled.button<StyleProps>`
  margin: 0.35rem 0 0.35rem 0.35rem;
`;

export default KanbanItem;
