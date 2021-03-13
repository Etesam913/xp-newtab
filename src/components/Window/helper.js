import React from 'react';
import styled from 'styled-components';
import Header from "../Header";
import {getDesiredItem, getTranslateXY, replaceDesiredWindowItem} from "../../functions/helpers";


export function handleComponentCreation(refToSearch, windowData, setWindowData, windowItem) {
    const selectedComponent = getSelectedComponent(refToSearch)
    addComponent(selectedComponent, windowData, setWindowData, windowItem)
}

export function addComponent(componentToAdd, windowData, setWindowData, windowItem) {
    let newItem = {...windowItem};
    let tempData = [...windowData];
    let maxId = -1
    for (let i = 0; i < newItem['items'].length; i++) {
        if (newItem['items'][i]['id'] > maxId)
            maxId = newItem['items'][i]['id']
    }
    if (componentToAdd === "Header") {
        newItem['items'].push({id: maxId + 1, componentName: "Header", text: "Header Text", justifyContent: 'flex-start'});
        replaceDesiredWindowItem(tempData, newItem);
        setWindowData(tempData)
        console.log(tempData)
    }
}

export function renderComponents(componentsArr, windowItem) {
    const components = componentsArr.map((item, index) => {
        function getComponent() {
            if (item["componentName"] === "Header") {
                return (
                    <Header
                        windowItem={windowItem}
                        item={item}
                        itemId={item["id"]}
                    />
                );
            }
        }

        return <ComponentItem key={"item-" + windowItem['id'] + "-" + index}>{getComponent()}</ComponentItem>
    })
    return <ComponentList>{components}</ComponentList>
}

const ComponentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ComponentItem = styled.li`
  margin: 0.5rem 0;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`


// For radio buttons
export function getSelectedComponent(componentsParent) {
    const components = componentsParent.current.children;
    // Starts at 1 to skip the "Select One" text. Ends at components.length-1 to skip the add component button
    for (let i = 1; i < components.length - 1; i++) {
        const currentComponent = components[i];
        const componentChildren = currentComponent.children;
        const radioInput = componentChildren[0]
        const radioLabel = componentChildren[1]
        if (radioInput.checked) {
            return radioLabel.innerText;
        }
    }
    return null;
}

export function setWindowProperty(windowData, setWindowData, windowItem, propertyName, propertyValue){
    const tempData = [...windowData];
    const itemToInsert = {...windowItem};
    itemToInsert[propertyName] = propertyValue;
    replaceDesiredWindowItem(tempData, itemToInsert);
    console.log(tempData);
    setWindowData(tempData);
}

export function updatePosition(windowRef, windowItem, windowData, setWindowData) {
    const positions = getTranslateXY(windowRef.current)
    const xPos = positions["translateX"];
    const yPos = positions["translateY"];
    let itemToInsert = {...windowItem};
    itemToInsert["xCoord"] = xPos
    itemToInsert["yCoord"] = yPos
    let tempData = [...windowData];
    replaceDesiredWindowItem(tempData, itemToInsert);
    setWindowData(tempData)
}

export function updateWindowTitle(e, windowData, setWindowData, windowItem) {
    const currentText = e.target.value;
    const tempData = [...windowData];
    const itemToInsert = {...windowItem};
    itemToInsert["windowTitle"] = currentText;
    replaceDesiredWindowItem(tempData, itemToInsert);
    setWindowData(tempData);
}

export function setHidden(windowData, setWindowData, windowItem, valToSet) {
    let tempData = [...windowData];
    let newWindowItem = {...windowItem};
    newWindowItem["hidden"] = valToSet;
    replaceDesiredWindowItem(tempData, newWindowItem);
    setWindowData(tempData);
}

export function changeItemProperty(windowItem, windowData, setWindowData, item, propertyName, propertyValue){
    const windowId = windowItem["id"];
    let newWindowData = [...windowData];
    // Gets the current window
    let desiredWindow = getDesiredItem(windowData, windowId);
    const items = desiredWindow["items"];
    // Gets the current item
    let desiredItem = getDesiredItem(items, item["id"]);
    desiredItem[propertyName] = propertyValue;
    newWindowData['items'] = items;
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

export function highlightText(selection){
    if(selection){
        let elem = document.createElement("span");
        elem.className = "selected";
        elem.appendChild(document.createTextNode(selection))

        /*const htmlToInsert = '<span class="selected">' + selection + '</span>';
        const text = header.current.innerHTML;*/
        const range = selection.getRangeAt(0);
        const parent = range.commonAncestorContainer;
        const grandParent = parent.parentElement;
        if(grandParent.tagName !== "A"){
            replaceSelectionWithNode(elem)
        }
    }
}

