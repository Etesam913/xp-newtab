export function getDefaultValue(localStorageProperty) {
  let defaultValue = false;
  if (localStorageProperty === "windowData") {
    defaultValue = [
      { id: 0, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] },
      { id: 1, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] }
    ];
  } else if (localStorageProperty === "iconData") {
    defaultValue = [
      {
        id: 0,
        src: "https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/Windows%20XP%20Mail.ico",
        title: "Email",
        xCoord: 0,
        yCoord: 0,
        redirect: "https://www.gmail.com"
      }
    ];
  } else if (localStorageProperty === "settingsData") {
    defaultValue = {
      backgroundColor: "#ffffff",
      backgroundImage: "https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/bliss.jpg"
    };
  }

  const propertyValue = JSON.parse(window.localStorage.getItem(localStorageProperty));
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

export function deleteDataItem(data, setData, dataItem) {
  const tempData = [...data];
  if (data.indexOf(dataItem) === -1) {
    console.error("CAN'T FIND WINDOW TO DELETE");
    return;
  }
  tempData.splice(tempData.indexOf(dataItem), 1);
  setData(tempData);
}

export function replaceDesiredWindowItem(windowData, windowItem) {
  for (let i = 0; i < windowData.length; i++) {
    if (windowData[i]["id"] === windowItem["id"]) {
      windowData[i] = windowItem;
    }
  }
}

// Used to create a new window or icon
export function addDataItem(data, setData, useCase, setFocusedWindow) {
  const tempData = [...data];
  const newId = getMaxId(data) + 1;
  if (setFocusedWindow)
    setFocusedWindow(newId);
  let newItem = {};
  if (useCase === "window") {
    newItem = { id: newId, windowTitle: "Insert Title Here", xCoord: 0, yCoord: 0, hidden: false, items: [] };
  } else if (useCase === "icon") {
    newItem = {
      id: newId,
      src: "https://via.placeholder.com/48",
      title: "Insert Title Here",
      xCoord: 0,
      yCoord: 0,
      redirect: "/"
    };
  }

  tempData.push(newItem);
  setData(tempData);
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

export function updateSetting(
  settingsData,
  setSettingsData,
  propertyName,
  propertyValue
) {
  const tempSettingsData = { ...settingsData };
  tempSettingsData[propertyName] = propertyValue;
  setSettingsData(tempSettingsData);
}



