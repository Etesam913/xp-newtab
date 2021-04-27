import { setDataProperty } from "../Window/helper";
import { getMaxId } from "../../functions/helpers";

export function createWindow(windowData, setWindowData) {
  let tempWindowData = [...windowData];
  const newId = getMaxId(windowData) + 1;
  const itemToAppend = { id: newId, windowTitle: "*Insert Title Here*" };
  tempWindowData.push(itemToAppend);
  setWindowData(tempWindowData);
}


export function handleEnter(
  e,
  windowData,
  setWindowData,
  windowItem,
  propertyName,
  propertyValue,
  setIsEditing) {
  if (e.keyCode === 13) {
    setIsEditing(false);
    setDataProperty(windowData, setWindowData, windowItem, propertyName, propertyValue);
  }

}
