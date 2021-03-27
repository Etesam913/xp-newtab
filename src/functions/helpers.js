export function getDefaultValue(localStorageProperty) {
  let defaultValue = false;
  if (localStorageProperty === "backgroundColor")
    defaultValue = "#ffffff";
  else if (localStorageProperty === "backgroundImage")
    defaultValue = "https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/bliss.jpg";
  else if (localStorageProperty === "windowData") {
    defaultValue = [
      { id: 0, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] },
      { id: 1, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] }
    ];
  } else if (localStorageProperty === "iconData") {
    defaultValue = [
      {
        id: 0,
        src: "https://via.placeholder.com/32",
        title: "Insert Title Here",
        xCoord: 0,
        yCoord: 0,
        redirect: "/"
      }
    ];
  }

  let propertyValue = window.localStorage.getItem(localStorageProperty);
  // Has to be parsed if the property is an object
  if (localStorageProperty === "windowData" || localStorageProperty === "iconData") {
    // If componentsArr is undefined uncomment localStorage.clear
    //localStorage.clear();
    propertyValue = JSON.parse(window.localStorage.getItem(localStorageProperty));
  }

  if (propertyValue !== null)
    defaultValue = propertyValue;
  return defaultValue;
}

export function getTranslateXY(element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42
  };
}

export function deleteWindowItem(windowData, setWindowData, windowItem) {
  const tempData = [...windowData];
  if (windowData.indexOf(windowItem) === -1) {
    console.error("CAN'T FIND WINDOW TO DELETE");
    return;
  }
  tempData.splice(tempData.indexOf(windowItem), 1);
  setWindowData(tempData);
}

export function replaceDesiredWindowItem(windowData, windowItem) {
  for (let i = 0; i < windowData.length; i++) {
    if (windowData[i]["id"] === windowItem["id"]) {
      windowData[i] = windowItem;
    }
  }
}

export function addWindowItem(windowData, setWindowData, setFocusedWindow) {
  const tempData = [...windowData];
  const newId = getMaxId(windowData) + 1;
  setFocusedWindow(newId);
  const newItem = { id: newId, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] };
  tempData.push(newItem);
  setWindowData(tempData);
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
  if (valueToConvert === "flex-start") {
    return "left";
  } else if (valueToConvert === "center") {
    return "center";
  } else if (valueToConvert === "flex-end") {
    return "right";
  }
}

export function convertTextAlignToJustifyContent(valueToConvert) {
  if (valueToConvert === "left") {
    return "flex-start";
  } else if (valueToConvert === "center") {
    return "center";
  } else if (valueToConvert === "right") {
    return "flex-end";
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

export function getTimeUnits() {
  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return { hour: hour, minutes: minutes, seconds: seconds };
}

export function getTimePeriodName(hourNumber) {
  if (hourNumber > 11 && hourNumber < 24) {
    return "PM";
  } else if (hourNumber === 24 || hourNumber < 12) {
    return "AM";
  }
}

export function getTwelveHourTime(hourNumber) {
  if (hourNumber > 12) {
    return hourNumber - 12;
  } else if (hourNumber === 0) {
    return 12;
  } else {
    return hourNumber;
  }
}

export function getMaxId(windowData) {
  let maxId = 0;
  for (let i = 0; i < windowData.length; i++) {
    if (windowData[i]["id"] > maxId) {
      maxId = windowData[i]["id"];
    }
  }
  return maxId;
}



