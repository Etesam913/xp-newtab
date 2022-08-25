import React from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import DragIndicator from "../DragIndicator";
import { useStore } from "../../Store";

function SortableItem({ children, id }) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DragHandle isEditModeOn={isEditModeOn} {...listeners} {...attributes}>
        <DragIndicator />
      </DragHandle>
      {children}
    </div>
  );
}

const DragHandle = styled.button`
  border: 0;
  background: transparent;
  display: ${(props) => !props.isEditModeOn && "none"};
  padding: 0;
`;

export default SortableItem;
