import { afterEach, describe, expect, it, vi } from "vitest";
import {
  parseSavedData,
  readSavedData,
  saveData,
  hasStorageErrors,
} from "./storage";
import { getDefaultValue } from "./helpers";

afterEach(() => vi.unstubAllGlobals());
describe("saved desktop migration", () => {
  it("migrates legacy defaults and repairs invalid theme values without discarding custom settings", () => {
    const settings = parseSavedData(
      "settingsData",
      JSON.stringify({
        backgroundColor: "#abcdef",
        backgroundImage:
          "https://storage.googleapis.com/etesam-public/Windows-XP-Newtab/images/bliss.jpg",
        windowsOS: 9,
      }),
    );
    expect(settings).toMatchObject({
      backgroundColor: "#abcdef",
      backgroundImage: "./assets/images/bliss.jpg",
      windowsOS: 0,
      draggingGrid: "0px",
    });
    const custom = parseSavedData(
      "settingsData",
      JSON.stringify({
        ...settings,
        backgroundImage: "https://example.com/custom.jpg",
      }),
    );
    expect(custom.backgroundImage).toBe("https://example.com/custom.jpg");
  });
  it("preserves empty desktops and legacy window state", () => {
    expect(parseSavedData("windowData", "[]")).toEqual([]);
    const windows = getDefaultValue("windowData", false);
    windows[0].items = [{ id: 1, componentName: "Text", editorState: null }];
    expect(parseSavedData("windowData", JSON.stringify(windows))).toEqual(
      windows,
    );
  });
  it("backs up malformed data before recovering", () => {
    const entries = new Map<string, string>([["windowData", "{broken"]]);
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
    });
    const fallback = getDefaultValue("windowData", false);
    expect(readSavedData("windowData", fallback)).toEqual(fallback);
    expect(
      [...entries].find(([key]) => key.startsWith("windowData.recovery."))?.[1],
    ).toBe("{broken");
  });
  it("rejects malformed shapes and survives inaccessible storage", () => {
    expect(() => parseSavedData("windowData", '[{"id":1}]')).toThrow();
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("quota");
      },
    });
    expect(readSavedData("iconData", [])).toEqual([]);
    expect(saveData("iconData", [])).toBe(false);
  });
});

it("keeps failed saves visible until the failing data can be saved", () => {
  vi.stubGlobal("localStorage", {
    setItem: (key: string) => {
      if (key === "windowData") throw new Error("quota");
    },
  });
  expect(saveData("windowData", [])).toBe(false);
  expect(saveData("iconData", [])).toBe(true);
  expect(hasStorageErrors()).toBe(true);
  vi.stubGlobal("localStorage", { setItem: () => undefined });
  expect(saveData("windowData", [])).toBe(true);
  expect(hasStorageErrors()).toBe(false);
});

it("does not overwrite corrupt data when its recovery copy cannot be stored", () => {
  const setItem = vi.fn((_key: string, _value: string) => {
    throw new Error("quota");
  });
  vi.stubGlobal("localStorage", { getItem: () => "{broken", setItem });
  expect(readSavedData("windowData", [])).toEqual([]);
  expect(saveData("windowData", [])).toBe(false);
  expect(
    setItem.mock.calls.every((call) =>
      String(call[0]).startsWith("windowData.recovery."),
    ),
  ).toBe(true);
  vi.stubGlobal("localStorage", { setItem: () => undefined });
  expect(saveData("windowData", [])).toBe(true);
});
