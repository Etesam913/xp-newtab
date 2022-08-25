import DragIndicator from "../DragIndicator";
import { DragHandle } from "../Window/SortableItem";
import { useSortable } from "@dnd-kit/sortable";
import styled from "styled-components";

function KanbanItem({ children, id, text = "🐛 🐛 🐛" }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div style={style}>
      {text}
      <DragHandle
        isEditModeOn={true}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <DragIndicator />
      </DragHandle>
      {text}
    </div>
  );
}

const KanbanItemContainer = styled.div`
  border: 2px solid black;
`;
export default KanbanItem;
