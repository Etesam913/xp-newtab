import React from "react";
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
import Editor from "../Editor";
import Image from "../Image";
import YouTubeVideo from "../YouTubeVideo";
import SearchBar from "../SearchBar";
import { replaceDesiredWindowItem } from "../../functions/helpers";
import { useStore } from "../../Store";
import KanbanBoard from "../KanbanBoard";
import TwitchEmbed from "../TwitchEmbed";

function getComponent(componentObj, windowItem) {
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
  } else if (componentObj["componentName"] === "Twitch Stream") {
    return <TwitchEmbed componentObj={componentObj} windowItem={windowItem} />;
  }
}

function RenderWindowComponents({ componentsArr, windowItem }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const components = componentsArr
    .map((item) => item["id"])
    .map((componentId, index) => {
      return (
        <SortableItem
          height={
            componentsArr[index]["componentName"] === "Twitch Stream" && "100%"
          }
          id={componentId}
          key={componentId}
        >
          {getComponent(componentsArr[index], windowItem)}
        </SortableItem>
      );
    });

  return (
    <DndContext
      id="bob"
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        style={{ color: "orange" }}
        items={componentsArr.map((item) => item["id"])}
        strategy={verticalListSortingStrategy}
      >
        {components}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
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
