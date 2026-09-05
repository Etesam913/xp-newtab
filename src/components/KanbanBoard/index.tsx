import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import type { Setter, KanbanItems, ColumnHeaders } from "../../types";
import type { DesktopWindow, KanbanBoardItem } from "../../types";
import type { StyleProps } from "../../types";
import { useRef, useState } from "react";
import styled from "styled-components";
import {
  closestCorners,
  DndContext,
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
import { handleDelete } from "../Window/helper";
import KanbanItemDragOverlay from "./KanbanItemOverlay";

function KanbanBoard({
  componentObj,
  windowItem,
}: {
  componentObj: KanbanBoardItem;
  windowItem: DesktopWindow;
}) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  const items = componentObj.items;
  const columnHeaders = componentObj.columnHeaders;
  function updateBoard<K extends "items" | "columnHeaders">(
    key: K,
    value: Parameters<Setter<KanbanBoardItem[K]>>[0],
  ) {
    setWindowData((current) =>
      current.map((window) =>
        window.id === windowItem.id
          ? {
              ...window,
              items: window.items.map((item) =>
                item.id === componentObj.id &&
                item.componentName === "Kanban Board"
                  ? {
                      ...item,
                      [key]:
                        typeof value === "function" ? value(item[key]) : value,
                    }
                  : item,
              ),
            }
          : window,
      ),
    );
  }
  const setItems: Setter<KanbanItems> = (value) => updateBoard("items", value);
  const setColumnHeaders: Setter<ColumnHeaders> = (value) =>
    updateBoard("columnHeaders", value);
  const beforeDrag = useRef<KanbanItems | null>(null);

  const columnContainer = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [dragOverlayWidth, setDragOverlayWidth] = useState(0);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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
    },
  );

  function getColumnMargin(index: number) {
    if (index === 0) return "0 0.5rem 0 0";
    if (index === Object.keys(items).length - 1) return "0 0 0 0.5rem";
    return "0 0.5rem";
  }

  const columnContent = Object.keys(items).map((itemKey, index) => {
    return (
      <Column
        key={itemKey}
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
        onDragCancel={() => {
          if (beforeDrag.current) setItems(beforeDrag.current);
          setActiveId(null);
        }}
      >
        <ColumnContainer ref={columnContainer}>
          {columnHeaderContent}
          {columnContent}
          <KanbanItemDragOverlay
            activeId={activeId}
            items={items}
            width={dragOverlayWidth}
          />
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
                  componentObj["id"],
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

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return String(id);
    }

    const keys = Object.keys(items);
    for (let i = 0; i < keys.length; i++) {
      const columnItems = items[keys[i]];
      for (let j = 0; j < columnItems.length; j++) {
        if (columnItems[j].id === id) {
          return keys[i];
        }
      }
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    beforeDrag.current = items;
    setActiveId(id);
    const widthOfEachColumn =
      (columnContainer.current?.clientWidth ?? 0) / Object.keys(items).length;
    const widthOfColumnPadding = 16 * Object.keys(items).length;
    setDragOverlayWidth(widthOfEachColumn - widthOfColumnPadding);
    // setDragOverlayWidth(active.rect.current.translated.width);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    if (!over) return;
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
      const activeIndex = activeItems.findIndex((obj) => obj.id === id);
      const overIndex = overItems.findIndex((obj) => obj.id === overId);
      if (activeIndex < 0) return prev;
      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          active.rect.current.translated &&
          active.rect.current.translated.top +
            active.rect.current.translated.height >
            over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    if (!event.over) {
      if (beforeDrag.current) setItems(beforeDrag.current);
      return;
    }
    const { active, over } = event;
    const { id } = active;
    if (!over) return;
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

    const activeIndex = items[activeContainer].findIndex(
      (obj) => obj.id === active.id,
    );
    const overIndex = items[overContainer].findIndex(
      (obj) => obj.id === overId,
    );

    if (activeIndex >= 0 && overIndex >= 0 && activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }

    setActiveId(null);
  }
}

const ColumnContainer = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 0.5rem;
`;

const DeleteButtonContainer = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div<StyleProps>`
  margin: 0.5rem 0;
`;

export default KanbanBoard;
