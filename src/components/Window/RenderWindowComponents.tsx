import { ComponentBoundary } from "./ComponentBoundary";
import { handleDelete } from "./helper";
import { lazy, Suspense } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { DesktopWindow, WindowComponent } from "../../types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
const Editor = lazy(() => import("../Editor"));
import Image from "../Image";
import YouTubeVideo from "../YouTubeVideo";
import SearchBar from "../SearchBar";
import { replaceDesiredWindowItem } from "../../functions/helpers";
import { useStore } from "../../Store";
const KanbanBoard = lazy(() => import("../KanbanBoard"));

function getComponent(
  componentObj: WindowComponent,
  windowItem: DesktopWindow,
) {
  if (componentObj["componentName"] === "Text") {
    return <Editor windowItem={componentObj} windowObj={windowItem} />;
  } else if (componentObj["componentName"] === "Image") {
    return <Image windowItem={componentObj} windowObj={windowItem} />;
  } else if (componentObj["componentName"] === "YouTube Video") {
    return <YouTubeVideo windowItem={componentObj} windowObj={windowItem} />;
  } else if (componentObj["componentName"] === "Search Bar") {
    return <SearchBar windowItem={componentObj} windowObj={windowItem} />;
  } else if (componentObj["componentName"] === "Kanban Board") {
    return <KanbanBoard componentObj={componentObj} windowItem={windowItem} />;
  }
}

function RenderWindowComponents({
  componentsArr,
  windowItem,
}: {
  componentsArr: WindowComponent[];
  windowItem: DesktopWindow;
}) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const components = componentsArr
    .map((item) => item["id"])
    .map((componentId, index) => {
      return (
        <SortableItem id={componentId} key={componentId}>
          <ComponentBoundary
            isEditModeOn={isEditModeOn}
            onDelete={() =>
              handleDelete(windowData, setWindowData, windowItem, componentId)
            }
          >
            <Suspense fallback={<p>Loading…</p>}>
              {getComponent(componentsArr[index], windowItem)}
            </Suspense>
          </ComponentBoundary>
        </SortableItem>
      );
    });

  return (
    <DndContext
      id={`window-${windowItem.id}`}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={componentsArr.map((item) => item["id"])}
        strategy={verticalListSortingStrategy}
      >
        {components}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      let tempComponentsArr = [...componentsArr];
      let tempWindowItem = { ...windowItem };

      const oldIndex = componentsArr.findIndex((item) => item.id === active.id);
      const newIndex = componentsArr.findIndex((item) => item.id === over.id);
      tempComponentsArr = arrayMove(tempComponentsArr, oldIndex, newIndex);

      tempWindowItem["items"] = tempComponentsArr;
      let tempWindowData = [...windowData];
      replaceDesiredWindowItem(tempWindowData, tempWindowItem);

      setWindowData(tempWindowData);
    }
  }
}

export default RenderWindowComponents;
