export function getDefaultValue(localStorageProperty) {
    let defaultValue = false;
    if (localStorageProperty === 'backgroundColor')
        defaultValue = "#ffffff"
    else if (localStorageProperty === 'backgroundImage')
        defaultValue = "https://i.imgur.com/VvNhMb0.jpg"
    else if (localStorageProperty === 'windowData') {
        defaultValue = [
            {id: 0, windowTitle: 'Insert Title Here', xCoord: 0, yCoord: 0, hidden: false, items: []},
            {id: 1, windowTitle: 'Insert Title Here', xCoord: 0, yCoord: 0, hidden: false, items: []},
        ];
    }

    let propertyValue = window.localStorage.getItem(localStorageProperty)
    // Has to be parsed if the property is an object
    if (localStorageProperty === 'windowData') {
        // If componentsArr is undefined uncomment localStorage.clear
        //localStorage.clear();
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

// Gets window based off of id
export function getDesiredItem(windowData, id) {
    for (let i = 0; i < windowData.length; i++) {
        if (windowData[i]["id"] === id) {
            return windowData[i];
        }
    }
    console.error("DESIRED WINDOW ITEM NOT FOUND");
    return null;
}

// Use this for centering text elements
export function convertJustifyContentToTextAlign(valueToConvert) {
    if (valueToConvert === 'flex-start') {
        return "left"
    } else if (valueToConvert === 'center') {
        return "center"
    } else if (valueToConvert === 'flex-end') {
        return "right"
    }
}

export function convertTextAlignToJustifyContent(valueToConvert) {
    if (valueToConvert === 'left') {
        return "flex-start"
    } else if (valueToConvert === 'center') {
        return "center"
    } else if (valueToConvert === 'right') {
        return "flex-end"
    }
}

export function getSelectionText() {
    if (window.getSelection) {
        try {
            let activeElement = document.activeElement;
            if (activeElement && activeElement.value) {
                // firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
                return activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
            } else {
                return window.getSelection().toString();
            }

        } catch (e) {
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // For IE
        return document.selection.createRange().text;
    }
}


