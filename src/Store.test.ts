import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { getDefaultValue } from "./functions/helpers";

beforeEach(() => {
  vi.resetModules();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it("restores saved data and persists direct and functional updates for every desktop key", async () => {
  const saved = {
    windowData: [],
    iconData: [],
    settingsData: { ...getDefaultValue("settingsData", false), windowsOS: 2 },
  };
  const entries = new Map(
    Object.entries(saved).map(([key, value]) => [key, JSON.stringify(value)]),
  );
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
  });
  const { useStore } = await import("./Store");

  expect(useStore.getState()).toMatchObject(saved);

  const { setWindowData, setIconData, setSettingsData } = useStore.getState();

  setWindowData(getDefaultValue("windowData", false));
  setWindowData((current) => [...current, { ...current[0], id: 7 }]);
  setIconData(getDefaultValue("iconData", false));
  setIconData((current) =>
    current.map((icon) => ({ ...icon, title: "Saved" })),
  );
  setSettingsData(getDefaultValue("settingsData", false));
  setSettingsData((current) => ({ ...current, backgroundColor: "#abcdef" }));

  expect(useStore.getState().windowData.map((window) => window.id)).toEqual([
    0, 7,
  ]);
  expect(useStore.getState().iconData[0].title).toBe("Saved");
  expect(useStore.getState().settingsData.backgroundColor).toBe("#abcdef");
  for (const key of ["windowData", "iconData", "settingsData"] as const)
    expect(JSON.parse(entries.get(key)!)).toEqual(useStore.getState()[key]);
});

it("keeps unsaved edits in memory and reports failure until that data is saved again", async () => {
  let failWindows = true;
  vi.stubGlobal("localStorage", {
    getItem: () => null,
    setItem: (key: string) => {
      if (key === "windowData" && failWindows) throw new Error("quota");
    },
  });
  const { useStore } = await import("./Store");
  const { setWindowData, setIconData } = useStore.getState();

  setWindowData([]);

  expect(useStore.getState().windowData).toEqual([]);
  expect(useStore.getState().storageError).toBe(true);

  setIconData([]);

  expect(useStore.getState().storageError).toBe(true);

  failWindows = false;
  setWindowData((current) => current);

  expect(useStore.getState().storageError).toBe(false);
});
