import {
  getTranslateXY,
  replaceDesiredWindowItem,
} from "../../functions/helpers";

export function handleComponentCreation(
  refToSearch,
  windowData,
  setWindowData,
  windowItem
) {
  const selectedComponent = getSelectedComponent(refToSearch);
  addComponent(selectedComponent, windowData, setWindowData, windowItem);
}

export function addComponent(
  componentToAdd,
  windowData,
  setWindowData,
  windowItem
) {
  let newItem = { ...windowItem };
  let tempData = [...windowData];
  let maxId = 0;
  for (let i = 0; i < newItem["items"].length; i++) {
    if (newItem["items"][i]["id"] > maxId) maxId = newItem["items"][i]["id"];
  }
  if (componentToAdd === "Text") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Text",
      editorState: null,
    });
  } else if (componentToAdd === "Image") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Image",
      href: null,
      src: "https://via.placeholder.com/300x175",
      justifyContent: "flex-start",
      imageWidth: "50%",
    });
  } else if (componentToAdd === "YouTube Video") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "YouTube Video",
      src: "https://www.youtube.com/embed/5pzM_pFNWak",
    });
  } else if (componentToAdd === "Search Bar") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Search Bar",
      engine: "Google",
      action: "https://www.google.com/search",
    });
  } else if (componentToAdd === "Kanban Board") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Kanban Board",
      columnHeaders: {
        A: "To Do",
        B: "Doing",
        C: "Done",
      },
      items: {
        A: [
          { id: 1, text: "🐶 Walk the dog" },
          { id: 2, text: "🖊 Give this app a review" },
        ],
        B: [{ id: 3, text: "📝 Finish my homework" }],
        C: [],
      },
    });
  } else if (componentToAdd === "Twitch Stream") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Twitch Stream",
      channelName: "xqc",
      size: "100%",
    });
  }
  replaceDesiredWindowItem(tempData, newItem);
  setWindowData(tempData);
}

// For radio buttons
export function getSelectedComponent(componentsParent) {
  const components = componentsParent.current.children;
  // Starts at 1 to skip the "Select One" text. Ends at components.length-1 to skip the add component button
  for (let i = 1; i < components.length - 1; i++) {
    const currentComponent = components[i];
    const componentChildren = currentComponent.children;
    const radioInput = componentChildren[0];
    const radioLabel = componentChildren[1];
    if (radioInput.checked) {
      return radioLabel.innerText;
    }
  }
  return null;
}

export function setDataProperty(
  data,
  setData,
  item,
  propertyName,
  propertyValue
) {
  const tempData = [...data];
  const itemToInsert = { ...item };
  if (propertyName === "position") {
    // Property value is the window ref in this case
    const positions = getTranslateXY(propertyValue.current);
    const xPos = positions["translateX"];
    const yPos = positions["translateY"];
    itemToInsert["xCoord"] = xPos;
    itemToInsert["yCoord"] = yPos;
  } else {
    itemToInsert[propertyName] = propertyValue;
  }

  replaceDesiredWindowItem(tempData, itemToInsert);

  setData(tempData);
  return tempData;
}

export function changeItemProperty(
  windowObj,
  windowData,
  setWindowData,
  windowItem,
  propertyName,
  propertyValue
) {
  let tempWindowData = [...windowData];
  let tempWindow = { ...windowObj };
  let items = tempWindow["items"];
  let tempWindowItem = { ...windowItem };
  tempWindowItem[propertyName] = propertyValue;
  replaceDesiredWindowItem(items, tempWindowItem);
  replaceDesiredWindowItem(tempWindowData, tempWindow);

  setWindowData(tempWindowData);
}

// For deleting an item
export function handleDelete(windowData, setWindowData, windowItem, id) {
  const tempItem = { ...windowItem };
  tempItem["items"] = tempItem["items"].filter((item) => item.id !== id);
  setDataProperty(
    windowData,
    setWindowData,
    windowItem,
    "items",
    tempItem["items"]
  );
}

export function handleResize(setHeight, setWidth, size) {
  setHeight(size.height);
  setWidth(size.width);
}
