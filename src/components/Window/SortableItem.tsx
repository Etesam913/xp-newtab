import type { StyleProps } from "../../types";
import React from "react";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import DragIndicator from "../DragIndicator";
import { useStore } from "../../Store";

function SortableItem({
  children,
  id,
  height,
}: {
  children: React.ReactNode;
  id: number;
  height?: string;
}) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, disabled: !isEditModeOn });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    height: height,
  };

  return (
    <div style={style} ref={setNodeRef}>
      <DragHandle
        ref={setActivatorNodeRef}
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

const DragHandle = styled.button<StyleProps>`
  border: 0 !important;
  background: transparent !important;
  display: ${(props) => (!props.isEditModeOn ? "none" : "flex")};
  padding: 0 !important;
  box-shadow: none;
  align-items: center;

  &:active {
    box-shadow: none !important;
    padding: 0 !important;
  }
`;

export default SortableItem;
