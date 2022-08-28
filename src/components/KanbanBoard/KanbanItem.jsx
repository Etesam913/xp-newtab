import DragIndicator from "../DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import styled from "styled-components";
import { useStore } from "../../Store";

function KanbanItem({
  columnId,
  text = "🐛 🐛 🐛",
  items,
  setItems,
  index,
  id,
}) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });
  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  function updateKanbanItem(text) {
    const copyOfItems = { ...items };
    copyOfItems[columnId][index] = text;
    setItems(copyOfItems);
  }

  function deleteKanbanItem() {
    const copyOfItems = { ...items };
    copyOfItems[columnId].splice(index, 1);
    setItems(copyOfItems);
  }

  return (
    <KanbanItemContainer style={style}>
      {isEditModeOn ? (
        <div style={{ width: "100%" }}>
          <KanbanTextArea
            type="text"
            value={items[columnId][index]}
            onChange={(e) => updateKanbanItem(e.target.value)}
          />
          <DeleteButton onClick={deleteKanbanItem}>Delete Item</DeleteButton>
        </div>
      ) : (
        <TextContainer>{text}</TextContainer>
      )}

      <DragHandle
        isEditModeOn={true}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <DragIndicator />
      </DragHandle>
    </KanbanItemContainer>
  );
}

const KanbanItemContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  align-items: center;
  background-color: #d5d1c1;
`;

const TextContainer = styled.p`
  width: calc(100% - 1.5rem);
  padding: 0.35rem;
  font-size: 0.8rem;
  white-space: pre-wrap;
`;

const KanbanTextArea = styled.textarea`
  font-size: 0.8rem;
  border: 1px solid rgb(127, 157, 185);
  width: 100%;
  resize: vertical;
`;

const DragHandle = styled.button`
  border: 0;
  background: transparent;
  display: ${(props) => (!props.isEditModeOn ? "none" : "flex")};
  padding: 0;
  box-shadow: none;
  align-items: center;
  margin-right: 0.2rem;
  :active {
    box-shadow: none !important;
    padding: 0 !important;
  }
`;

const DeleteButton = styled.button`
  margin: 0.35rem 0 0.35rem 0.35rem;
`;

export default KanbanItem;
