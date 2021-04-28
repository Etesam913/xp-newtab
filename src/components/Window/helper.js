import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../Header";
import { getDesiredItem, getTranslateXY, replaceDesiredWindowItem } from "../../functions/helpers";
import Image from "../Image";
import { AppContext } from "../../Contexts";
import Video from "../Video";
import List from "../List";


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
        '<li contenteditable="true" class="list-item">first child</li>'
      ]
    });
  }
  replaceDesiredWindowItem(tempData, newItem);
  setWindowData(tempData);
}

export function RenderComponents(componentsArr, windowItem) {
  const { isEditModeOn } = useContext(AppContext);
  const componentLength = componentsArr.length;
  const components = componentsArr.map((item, index) => {
    function getComponent() {
      if (item["componentName"] === "Header") {
        return (
          <Header windowItem={windowItem} item={item} />
        );
      } else if (item["componentName"] === "Image") {
        return (
          <Image windowItem={windowItem} item={item} />
        );
      } else if (item["componentName"] === "Video") {
        return (
          <Video item={item} windowItem={windowItem} />
        );
      } else if (item["componentName"] === "List") {
        return (
          <List item={item} windowItem={windowItem} />
        );
      }
    }

    return (
      <ComponentItem
        isEditModeOn={isEditModeOn}
        componentLength={componentLength}
        key={"item-" + windowItem["id"] + "-" + index}
      >
        {getComponent()}
      </ComponentItem>
    );
  });
  return <ComponentList>{components}</ComponentList>;
}

const ComponentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ComponentItem = styled.li`
  padding: 0.25rem 0;
  /*border: ${props => !props.isEditModeOn ? "0px" : "solid #b1afaf"} !important;*/
  /*border-width: 1px 0 1px 0 !important;*/

  :first-child {
    padding-top: 0;
    /*border-width: ${props => props.componentLength === 1 ? "0px" : "0 0 0.5px 0"} !important;*/
  }

  :last-child {
    padding-bottom: 0;
   /* border-width: ${props => props.componentLength === 1 ? "0px" : "0.5px 0 0px 0"} !important;*/
  }
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
}

export function changeItemProperty(windowItem, windowData, setWindowData, item, propertyName, propertyValue) {
  const windowId = windowItem["id"];
  let newWindowData = [...windowData];
  // Gets the current window
  let desiredWindow = getDesiredItem(windowData, windowId);
  const items = desiredWindow["items"];
  // Gets the current item
  let desiredItem = getDesiredItem(items, item["id"]);
  desiredItem[propertyName] = propertyValue;
  newWindowData["items"] = items;
  setWindowData(newWindowData);
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


