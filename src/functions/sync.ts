import { useStore } from "../Store";
import { getDefaultValue } from "./helpers";
import { parseSavedData } from "./storage";

export function syncDesktopFromStorage(event: StorageEvent) {
  const key = event.key;
  if (key !== "windowData" && key !== "iconData" && key !== "settingsData")
    return;
  try {
    if (event.storageArea !== localStorage) return;
    if (key === "windowData")
      useStore.setState({
        windowData:
          event.newValue === null
            ? getDefaultValue(key, false)
            : parseSavedData(key, event.newValue),
      });
    else if (key === "iconData")
      useStore.setState({
        iconData:
          event.newValue === null
            ? getDefaultValue(key, false)
            : parseSavedData(key, event.newValue),
      });
    else
      useStore.setState({
        settingsData:
          event.newValue === null
            ? getDefaultValue(key, false)
            : parseSavedData(key, event.newValue),
      });
  } catch (error) {
    console.warn("Could not synchronize saved desktop data.", error);
  }
}
