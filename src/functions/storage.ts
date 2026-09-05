import * as v from "valibot";
import type { DesktopIcon, DesktopWindow, Settings } from "../types";

const id = v.pipe(v.number(), v.integer(), v.minValue(0));
const text = v.object({
  id,
  componentName: v.literal("Text"),
  editorState: v.nullable(v.string()),
});
const image = v.object({
  id,
  componentName: v.literal("Image"),
  src: v.string(),
  href: v.nullable(v.string()),
  justifyContent: v.picklist(["flex-start", "center", "flex-end"]),
  imageWidth: v.string(),
});
const video = v.object({
  id,
  componentName: v.literal("YouTube Video"),
  src: v.string(),
});
const search = v.object({
  id,
  componentName: v.literal("Search Bar"),
  engine: v.picklist(["Google", "DuckDuckGo", "Bing"]),
  action: v.string(),
});
const board = v.pipe(
  v.object({
    id,
    componentName: v.literal("Kanban Board"),
    columnHeaders: v.record(v.string(), v.string()),
    items: v.record(v.string(), v.array(v.object({ id, text: v.string() }))),
  }),
  v.check(
    (value) =>
      Object.keys(value.columnHeaders).length > 0 &&
      Object.keys(value.columnHeaders).length ===
        Object.keys(value.items).length &&
      Object.keys(value.columnHeaders).every((key) =>
        Object.hasOwn(value.items, key),
      ),
  ),
);
const windowSchema = v.object({
  id,
  windowTitle: v.string(),
  xCoord: v.pipe(v.number(), v.finite()),
  yCoord: v.pipe(v.number(), v.finite()),
  hidden: v.optional(v.boolean(), false),
  isMaximized: v.optional(v.boolean(), false),
  size: v.object({
    width: v.pipe(v.number(), v.finite(), v.minValue(1)),
    height: v.pipe(v.number(), v.finite(), v.minValue(1)),
  }),
  items: v.array(v.union([text, image, video, search, board])),
});
const iconSchema = v.object({
  id,
  src: v.string(),
  title: v.string(),
  xCoord: v.pipe(v.number(), v.finite()),
  yCoord: v.pipe(v.number(), v.finite()),
  redirect: v.string(),
});
const settingsSchema = v.object({
  backgroundColor: v.optional(v.string(), "#ffffff"),
  backgroundImage: v.optional(v.string(), "./assets/images/bliss.jpg"),
  draggingGrid: v.fallback(v.picklist(["0px", "15px", "30px", "45px"]), "0px"),
  stylesheet: v.optional(v.string(), ""),
  windowsOS: v.fallback(v.picklist([0, 1, 2]), 0),
});
export interface SavedData {
  windowData: DesktopWindow[];
  iconData: DesktopIcon[];
  settingsData: Settings;
}
const schemas = {
  windowData: v.array(windowSchema),
  iconData: v.array(iconSchema),
  settingsData: settingsSchema,
} satisfies { [K in keyof SavedData]: v.GenericSchema<unknown, SavedData[K]> };
const legacyAssetRoot =
  "https://storage.googleapis.com/etesam-public/Windows-XP-Newtab/";
export function migrateAsset(url: string): string {
  const builtIn = [
    "images/bliss.jpg",
    "images/windows98-homepage.png",
    "images/windows-7-homepage.jpg",
  ];
  const relative = url.slice(legacyAssetRoot.length);
  if (url.startsWith(legacyAssetRoot) && builtIn.includes(relative))
    return "./assets/" + relative;
  if (url === "https://via.placeholder.com/48") return "./logo48.png";
  if (url === "https://via.placeholder.com/300x175")
    return "./assets/image-placeholder.svg";
  return url;
}
export function parseSavedData<K extends keyof SavedData>(
  key: K,
  raw: string,
): SavedData[K] {
  const parsed = v.parse(schemas[key], JSON.parse(raw));
  if (key === "settingsData") {
    const settings = parsed as Settings;
    settings.backgroundImage = migrateAsset(settings.backgroundImage);
    settings.stylesheet = "";
  } else if (key === "iconData") {
    for (const icon of parsed as DesktopIcon[])
      icon.src = migrateAsset(icon.src);
  } else {
    for (const window of parsed as DesktopWindow[]) {
      for (const item of window.items)
        if (item.componentName === "Image") item.src = migrateAsset(item.src);
    }
  }
  return parsed as SavedData[K];
}
const failedWrites = new Set<keyof SavedData>();
export function hasStorageErrors() {
  return failedWrites.size > 0;
}

const pendingRecovery = new Map<keyof SavedData, string>();

// Keep the original value recoverable before replacing malformed storage with defaults.
export function readSavedData<K extends keyof SavedData>(
  key: K,
  fallback: SavedData[K],
): SavedData[K] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return parseSavedData(key, raw);
  } catch (error) {
    if (raw !== null) {
      try {
        localStorage.setItem(`${key}.recovery.${Date.now()}`, raw);
      } catch {
        pendingRecovery.set(key, raw);
        failedWrites.add(key);
      }
    }
    console.warn(`Could not restore ${key}; using defaults.`, error);
    return fallback;
  }
}
export function saveData<K extends keyof SavedData>(
  key: K,
  value: SavedData[K],
): boolean {
  try {
    const original = pendingRecovery.get(key);
    if (original !== undefined) {
      localStorage.setItem(`${key}.recovery.${Date.now()}`, original);
      pendingRecovery.delete(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
    failedWrites.delete(key);
    return true;
  } catch (error) {
    failedWrites.add(key);
    console.warn(`Could not save ${key}.`, error);
    return false;
  }
}
