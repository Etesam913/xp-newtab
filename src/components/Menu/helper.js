export function createWindow(windowData, setWindowData) {
    let tempWindowData = [...windowData];
    const newId = getMaxId(windowData) + 1;
    const itemToAppend = {id: newId, windowTitle: '*Insert Title Here*'};
    tempWindowData.push(itemToAppend);
    setWindowData(tempWindowData);
}

export function updateWindowTitle(newTitle, id, windowData, setWindowData) {
    let desiredObj = null;
    let tempWindowData = [...windowData];

    for (let i = 0; i < tempWindowData.length; i++) {
        // desiredObj found
        if (tempWindowData[i]['id'] === id) {
            desiredObj = tempWindowData[i];
            desiredObj['windowTitle'] = newTitle;
            tempWindowData[i] = desiredObj;
            setWindowData(tempWindowData);
            return;
        }
    }
    if (desiredObj === null) console.error('OBJ NOT FOUND WHEN UPDATING TITLE!');
}

// Pressing enter on input
export function handleEnter(e, id, windowData, setWindowData, setIsEditing) {
    if (e.code === 'Enter') {
        updateWindowTitle(e.target.value, id, windowData, setWindowData);
        setIsEditing(false)
    }
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
