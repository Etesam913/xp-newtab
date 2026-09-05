import type { DesktopIcon, DesktopWindow, Setter, Settings } from "../types";
import { readSavedData, type SavedData } from "./storage";

export function getDefaultValue<K extends keyof SavedData>(
  key: K,
  lookForStoredValue = true,
  id = 0,
): SavedData[K] {
  const defaults: SavedData = {
    windowData: [
      {
        id,
        windowTitle: "Insert Title Here",
        xCoord: 30,
        yCoord: 30,
        hidden: false,
        items: [],
        isMaximized: false,
        size: { width: 480, height: 70 },
      },
    ],
    iconData: [
      {
        id,
        src: "./logo48.png",
        title: "Insert Title Here",
        xCoord: 30,
        yCoord: 30,
        redirect: "https://www.google.com/",
      },
    ],
    settingsData: {
      backgroundColor: "#ffffff",
      backgroundImage: "./assets/images/bliss.jpg",
      draggingGrid: "0px",
      stylesheet: "",
      windowsOS: 0,
    },
  };
  return lookForStoredValue ? readSavedData(key, defaults[key]) : defaults[key];
}
export function getTranslateXY(element: Element) {
  const matrix = new DOMMatrixReadOnly(
    window.getComputedStyle(element).transform,
  );
  return { translateX: matrix.m41, translateY: matrix.m42 };
}
export function deleteDataItem<T extends { id: number }>(
  _data: T[],
  setData: Setter<T[]>,
  item: T,
) {
  setData((current) => current.filter((candidate) => candidate.id !== item.id));
}
export function replaceDesiredWindowItem<T extends { id: number }>(
  items: T[],
  item: T,
) {
  const index = items.findIndex((candidate) => candidate.id === item.id);
  if (index !== -1) items[index] = item;
}
export function addDataItem(
  data: DesktopWindow[],
  setData: Setter<DesktopWindow[]>,
  useCase: "window",
  setFocusedWindow: (id: number) => void,
): void;
export function addDataItem(
  data: DesktopIcon[],
  setData: Setter<DesktopIcon[]>,
  useCase: "icon",
): void;
export function addDataItem(
  _data: DesktopWindow[] | DesktopIcon[],
  setData: Setter<DesktopWindow[]> | Setter<DesktopIcon[]>,
  useCase: "window" | "icon",
  setFocusedWindow?: (id: number) => void,
) {
  if (useCase === "window") {
    let id = 0;
    (setData as Setter<DesktopWindow[]>)((current) => {
      id = getMaxId(current) + 1;
      return [...current, getDefaultValue("windowData", false, id)[0]];
    });
    setFocusedWindow?.(id);
  } else {
    (setData as Setter<DesktopIcon[]>)((current) => [
      ...current,
      getDefaultValue("iconData", false, getMaxId(current) + 1)[0],
    ]);
  }
}
export function convertJustifyContentToTextAlign(value: string) {
  return value === "flex-end"
    ? "right"
    : value === "center"
      ? "center"
      : "left";
}
export function convertTextAlignToJustifyContent(value: string) {
  return value === "right"
    ? "flex-end"
    : value === "center"
      ? "center"
      : "flex-start";
}
export function getTimeUnits() {
  const date = new Date();
  return {
    hour: date.getHours(),
    minutes: String(date.getMinutes()).padStart(2, "0"),
    seconds: String(date.getSeconds()).padStart(2, "0"),
  };
}
export function getTimePeriodName(hour: number) {
  return hour >= 12 && hour < 24 ? "PM" : "AM";
}
export function getTwelveHourTime(hour: number) {
  return hour % 12 || 12;
}
export function getMaxId(items: { id: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0);
}
export function updateSetting<K extends keyof Settings>(
  _settings: Settings,
  setSettings: Setter<Settings>,
  property: K,
  value: Settings[K],
) {
  setSettings((current) => ({ ...current, [property]: value }));
}
export function toggleEditOnKeyPress(event: KeyboardEvent, toggle: () => void) {
  if (
    (event.metaKey || event.ctrlKey) &&
    event.key.toLowerCase() === "e" &&
    !event.repeat
  ) {
    event.preventDefault();
    toggle();
  }
}
