import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import Column from "./Column";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import KanbanHeader from "./KanbanHeader";
import { useStore } from "../../Store";
import { changeItemProperty, handleDelete } from "../Window/helper";

function KanbanBoard({ componentObj, windowItem }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  const [items, setItems] = useState(componentObj["items"]);
  const [columnHeaders, setColumnHeaders] = useState(
    componentObj["columnHeaders"]
  );

  useEffect(() => {
    changeItemProperty(
      windowItem,
      windowData,
      setWindowData,
      componentObj,
      "items",
      items
    );
  }, [items]);

  useEffect(() => {
    changeItemProperty(
      windowItem,
      windowData,
      setWindowData,
      componentObj,
      "columnHeaders",
      columnHeaders
    );
  }, [columnHeaders]);

  const columnContainer = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [dragOverlayWidth, setDragOverlayWidth] = useState(0);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columnHeaderContent = Object.keys(columnHeaders).map(
    (columnKey, index) => {
      return (
        <KanbanHeader
          margin={getColumnMargin(index)}
          columnHeaders={columnHeaders}
          setColumnHeaders={setColumnHeaders}
          id={columnKey}
          key={`header-${columnKey}`}
        />
      );
    }
  );

  function getColumnMargin(index) {
    if (index === 0) return "0 0.5rem 0 0";
    if (index === Object.keys(items).length - 1) return "0 0 0 0.5rem";
    return "0 0.5rem";
  }

  const columnContent = Object.keys(items).map((itemKey, index) => {
    return (
      <Column
        key={`column-${index}`}
        margin={getColumnMargin(index)}
        id={itemKey}
        items={items}
        setItems={setItems}
      />
    );
  });

  return (
    <Wrapper>
      <DndContext
        modifiers={[snapCenterToCursor]}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ColumnContainer ref={columnContainer}>
          {columnHeaderContent}
          {columnContent}

          <DragOverlay>
            {activeId && (
              <div
                style={{
                  opacity: 0,
                  width: dragOverlayWidth + "px",
                }}
              >
                <KanbanItem>{activeId}</KanbanItem>
              </div>
            )}
          </DragOverlay>
        </ColumnContainer>
        {isEditModeOn && (
          <DeleteButtonContainer>
            <button
              type="button"
              onClick={() => {
                handleDelete(
                  windowData,
                  setWindowData,
                  windowItem,
                  componentObj["id"]
                );
              }}
            >
              Delete Board
            </button>
          </DeleteButtonContainer>
        )}
      </DndContext>
    </Wrapper>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    const widthOfEachColumn =
      columnContainer.current.clientWidth / Object.keys(items).length;
    const widthOfColumnPadding = 16 * Object.keys(items).length;
    setDragOverlayWidth(widthOfEachColumn - widthOfColumnPadding);
    // setDragOverlayWidth(active.rect.current.translated.width);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;
    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          active.rect.current.translated.top +
            active.rect.current.translated.height >
            over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
}

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 0.5rem;
`;
const KanbanItem = styled.div``;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 0.5rem 0;
`;

export default KanbanBoard;
