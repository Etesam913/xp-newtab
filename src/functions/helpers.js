export function getDefaultValue(localStorageProperty) {
    let defaultValue = false;
    if (localStorageProperty === 'backgroundColor')
        defaultValue = "#ffffff"
    else if (localStorageProperty === 'backgroundImage')
        defaultValue = ""
    else if (localStorageProperty === 'windowData') {
        defaultValue = [
            {id: 0, windowTitle: 'Insert Title Here', xCoord: 0, yCoord: 0, items: []},
            {id: 1, windowTitle: 'Insert Title Here', xCoord: 0, yCoord: 0, items: []},
        ];
    }
    let propertyValue = window.localStorage.getItem(localStorageProperty)
    // Has to be parsed if the property is an object
    if (localStorageProperty === 'windowData') {
        propertyValue = JSON.parse(window.localStorage.getItem(localStorageProperty))
    }

    if (propertyValue !== null)
        defaultValue = propertyValue;
    return defaultValue
}

export function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

export function replaceDesiredWindowItem(windowData, windowItem) {
    for (let i = 0; i < windowData.length; i++) {
        if (windowData[i]["id"] === windowItem["id"]) {
            windowData[i] = windowItem;
        }
    }
}

export function getDesiredItem(windowData, id){
    for (let i = 0; i < windowData.length; i++) {
        if (windowData[i]["id"] === id) {
            return windowData[i];
        }
    }
    console.error("DESIRED WINDOW ITEM NOT FOUND");
    return null;
}
