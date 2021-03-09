import {getTranslateXY} from "../../functions/helpers";

export function getSelectedComponent(componentsParent){
    const components = componentsParent.current.children;
    // Starts at 1 to skip the "Select One" text. Ends at components.length-1 to skip the add component button
    for(let i = 1; i < components.length-1; i++){
        const currentComponent = components[i];
        const componentChildren = currentComponent.children;
        const radioInput = componentChildren[0]
        const radioLabel = componentChildren[1]
        if(radioInput.checked){
            return radioLabel.innerText;
        }
    }
    return null;
}

export function updatePosition(windowRef, windowItem, windowData, setWindowData) {
    const positions = getTranslateXY(windowRef.current)
    const xPos = positions["translateX"];
    const yPos = positions["translateY"];
    let itemToInsert = {...windowItem};
    itemToInsert["xCoord"] = xPos
    itemToInsert["yCoord"] = yPos
    let tempData = [...windowData];
    const desired_id = windowItem["id"];
    for (let i = 0; i < tempData.length; i++) {
        if (tempData[i]["id"] === desired_id) {
            tempData[i] = itemToInsert;
        }
    }
    setWindowData(tempData)
}
