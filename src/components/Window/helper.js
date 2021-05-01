import React, { useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../Header";
import { getDesiredItem, getTranslateXY, replaceDesiredWindowItem } from "../../functions/helpers";
import Image from "../Image";
import { AppContext } from "../../Contexts";
import Video from "../Video";
import List from "../List";
import DragIndicator from "../DragIndicator";


export function handleComponentCreation(refToSearch, windowData, setWindowData, windowItem) {
  const selectedComponent = getSelectedComponent(refToSearch);
  addComponent(selectedComponent, windowData, setWindowData, windowItem);
}

export function addComponent(componentToAdd, windowData, setWindowData, windowItem) {
  let newItem = { ...windowItem };
  let tempData = [...windowData];
  let maxId = -1;
  for (let i = 0; i < newItem['items'].length; i++) {
    if (newItem["items"][i]["id"] > maxId)
      maxId = newItem["items"][i]["id"];
  }
  if (componentToAdd === "Header") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Header",
      html: "<p>Header Text</p>",
      justifyContent: "flex-start"
    });
  } else if (componentToAdd === "Image") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Image",
      href: null,
      src: "https://via.placeholder.com/300x175",
      justifyContent: "flex-start"
    });
  } else if (componentToAdd === "Video") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "Video",
      src: "https://www.youtube.com/embed/5pzM_pFNWak"
    });
  } else if (componentToAdd === "List") {
    newItem["items"].push({
      id: maxId + 1,
      componentName: "List",
      children: [
        { id: 0, html: "<li contenteditable=\"true\" class=\"list-item\">first child</li><button class='show list-delete-button'>Delete</button>" }
      ]
    });
  }
  replaceDesiredWindowItem(tempData, newItem);
  setWindowData(tempData);
}

export function RenderComponents(componentsArr, windowObj) {
  /*const [componentsList, updateComponentsList] = useState(componentsArr);*/
  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);
  const componentLength = componentsArr.length;

  function handleOnDragEnd(result){
    if (!result.destination) return;
    const items = Array.from(componentsArr);
    // Recreates the components arr array
    // with the correct positions after dragging
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    let tempWindowData = [...windowData]
    let tempWindowItem = {...windowObj}
    tempWindowItem["items"] = items
    replaceDesiredWindowItem(tempWindowData, tempWindowItem)
    setWindowData(tempWindowData);
  }

  const components = componentsArr.map((windowItem, index) => {
    function getComponent() {
      if (windowItem["componentName"] === "Header") {
        return (
          <Header windowItem={windowItem} windowObj={windowObj} />
        );
      } else if (windowItem["componentName"] === "Image") {
        return (
          <Image windowItem={windowItem} windowObj={windowObj} />
        );
      } else if (windowItem["componentName"] === "Video") {
        return (
          <Video windowItem={windowItem} windowObj={windowObj} />
        );
      } else if (windowItem["componentName"] === "List") {
        return (
          <List windowItem={windowItem} windowObj={windowObj} />
        );
      }
    }

    return (
      <Draggable
        key={"item-" + windowObj["id"] + "-" + index}
        draggableId={"item-" + windowObj["id"] + "-" + index}
        index={index}
        isDragDisabled={!isEditModeOn}
      >
        {(provided, snapshot) => {
          if (snapshot.isDragging) {
            provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
            provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
          }
          return (
            <ComponentItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isEditModeOn={isEditModeOn}
              componentLength={componentLength}
            >
              <DragIndicator />
              {getComponent()}
            </ComponentItem>
          );
        }}
      </Draggable>
    );
  });
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="window-items">
        {(provided) => (
          <ComponentList ref={provided.innerRef} {...provided.droppableProps}>
            {components}
            {provided.placeholder}
          </ComponentList>
        )}

      </Droppable>
    </DragDropContext>
  );
}

const ComponentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ComponentItem = styled.li`
  padding: 0.25rem 0;
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
  propertyValue,
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
  return tempData
}

export function changeItemProperty(windowObj, windowData, setWindowData, windowItem, propertyName, propertyValue) {
  /*const windowId = windowItem["id"];*/
  let tempWindowData = [...windowData];
  // Gets the current window
  /*let desiredWindow = getDesiredItem(windowData, windowId);*/
  let tempWindow = {...windowObj}
  let items = tempWindow["items"]
  // Gets the current item
  /*let desiredItem = getDesiredItem(items, item["id"]);*/
  let tempWindowItem = {...windowItem}
  tempWindowItem[propertyName] = propertyValue;
  replaceDesiredWindowItem(items, tempWindowItem)
  replaceDesiredWindowItem(tempWindowData, tempWindow)
  setWindowData(tempWindowData);
}

// Good for adding selection class, bolding, underlining, etc..
function replaceSelectionWithNode(node) {
  let range, html;
  if (window.getSelection && window.getSelection().getRangeAt) {
    range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    html = (node.nodeType === 3) ? node.data : node.outerHTML;
    range.pasteHTML(html);
  }
}

export function highlightText(selection) {
  if (selection) {
    let elem = document.createElement("span");
    elem.className = "selected";
    elem.appendChild(document.createTextNode(selection));

    /*const htmlToInsert = '<span class="selected">' + selection + '</span>';
    const text = header.current.innerHTML;*/
    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer;
    const grandParent = parent.parentElement;
    if (grandParent.tagName !== "A") {
      replaceSelectionWithNode(elem);
    }
  }
}

// For deleting an item
export function handleDelete(windowData, setWindowData, windowItem, id) {
  const tempItem = { ...windowItem };
  tempItem["items"] = tempItem["items"].filter(item => item.id !== id);
  setDataProperty(windowData, setWindowData, windowItem, "items", tempItem["items"]);
}


