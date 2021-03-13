import {setWindowProperty} from "../Window/helper";

export function createWindow(windowData, setWindowData) {
    let tempWindowData = [...windowData];
    const newId = getMaxId(windowData) + 1;
    const itemToAppend = {id: newId, windowTitle: '*Insert Title Here*'};
    tempWindowData.push(itemToAppend);
    setWindowData(tempWindowData);
}

function getMaxId(windowData) {
    let maxId = 0;
    for (let i = 0; i < windowData.length; i++) {
        if (windowData[i]['id'] > maxId) {
            maxId = windowData[i]['id'];
        }
    }
    return maxId;
}

export function handleEnter(
    e,
    windowData,
    setWindowData,
    windowItem,
    propertyName,
    propertyValue,
    setIsEditing) {
    if(e.keyCode === 13){
        setIsEditing(false);
        setWindowProperty(windowData, setWindowData, windowItem, propertyName, propertyValue);
    }

}
