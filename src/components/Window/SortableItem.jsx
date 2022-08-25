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
    <div style={style}>
      <DragHandle
        ref={setNodeRef}
        isEditModeOn={isEditModeOn}
        {...listeners}
        {...attributes}
      >
        <DragIndicator />
      </DragHandle>
      {children}
    </div>
  );
}

export const DragHandle = styled.button`
  border: 0;
  background: transparent;
  display: ${(props) => (!props.isEditModeOn ? "none" : "flex")};
  padding: 0;
  box-shadow: none;
  align-items: center;

  :active {
    box-shadow: none !important;
    padding: 0 !important;
  }
`;

export default SortableItem;
