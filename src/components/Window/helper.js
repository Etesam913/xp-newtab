import React from "react";
import styled from "styled-components";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import Header from "../Header";
import {
  getTranslateXY,
  replaceDesiredWindowItem,
} from "../../functions/helpers";
import Image from "../Image";
import Video from "../Video";
import List from "../List";
import DragIndicator from "../DragIndicator";
import arrayMove from "array-move";
import SearchBar from "../SearchBar";
import { useStore } from "../../Store";

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
  let maxId = -1;
  for (let i = 0; i < newItem["items"].length; i++) {
    if (newItem["items"][i]["id"] > maxId) maxId = newItem["items"][i]["id"];
  }
  if (componentToAdd === "Header") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Header",
      html: "<p>Header Text</p>",
      justifyContent: "flex-start",
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
  } else if (componentToAdd === "Video") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Video",
      src: "https://www.youtube.com/embed/5pzM_pFNWak",
    });
  } else if (componentToAdd === "List") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "List",
      children: [
        {
          id: 0,
          html:
            '<li contenteditable="true" class="list-item">first child</li>' +
            "<div class='list-item-options show'>" +
            "<button class='list-delete-button'>Delete</button>" +
            "<button class='list-strikethrough-button'>Strikethrough</button>" +
            "</div>",
        },
      ],
    });
  } else if (componentToAdd === "Search Bar") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Search Bar",
      engine: "Google",
      action: "https://www.google.com/search",
    });
  }
  replaceDesiredWindowItem(tempData, newItem);
  setWindowData(tempData);
}

const DragHandle = sortableHandle(() => <DragIndicator />);

const SortableItem = sortableElement(({ children }) => (
  <ComponentItem>
    <DragHandle />
    {children}
  </ComponentItem>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ComponentList>{children}</ComponentList>;
});

export function RenderComponents({
  componentsArr,
  windowObj,
  moveCursor,
  autoCursor,
}) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const components = componentsArr.map((windowItem, index) => {
    function getComponent() {
      if (windowItem["componentName"] === "Header") {
        return <Header windowItem={windowItem} windowObj={windowObj} />;
      } else if (windowItem["componentName"] === "Image") {
        return <Image windowItem={windowItem} windowObj={windowObj} />;
      } else if (windowItem["componentName"] === "Video") {
        return <Video windowItem={windowItem} windowObj={windowObj} />;
      } else if (windowItem["componentName"] === "List") {
        return <List windowItem={windowItem} windowObj={windowObj} />;
      } else if (windowItem["componentName"] === "Search Bar") {
        return <SearchBar windowItem={windowItem} windowObj={windowObj} />;
      }
    }

    return (
      <SortableItem key={"item-" + windowObj["id"] + "-" + index} index={index}>
        {getComponent()}
      </SortableItem>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let tempComponentsArr = [...componentsArr];
    tempComponentsArr = arrayMove(tempComponentsArr, oldIndex, newIndex);
    let tempWindowObj = { ...windowObj };
    tempWindowObj["items"] = tempComponentsArr;
    let tempWindowData = [...windowData];
    replaceDesiredWindowItem(tempWindowData, tempWindowObj);
    setWindowData(tempWindowData);
    document.body.style.cursor = autoCursor;
    /*this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));*/
  };

  return (
    <SortableContainer
      useDragHandle
      onSortEnd={onSortEnd}
      onSortMove={() => {
        document.body.style.cursor = moveCursor;
      }}
    >
      {components}
    </SortableContainer>
  );
}

const ComponentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ComponentItem = styled.li`
  padding: 0.25rem 0;
  z-index: 5;
  list-style-type: none;
  font-family: ${(props) => props.theme.fonts.primary};
`;

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
