import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { getDefaultValue } from "./helpers";

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal("localStorage", { getItem: () => null, setItem: vi.fn() });
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// The handler only reads these StorageEvent fields; no DOM environment is needed.
function storageEvent(
  key: string | null,
  newValue: string | null,
  storageArea = localStorage,
) {
  return { key, newValue, storageArea } as StorageEvent;
}

it.each(["windowData", "iconData", "settingsData"] as const)(
  "synchronizes %s without writing back or changing local UI state",
  async (key) => {
    const { useStore } = await import("../Store");
    const { syncDesktopFromStorage } = await import("./sync");
    useStore.setState({ isEditModeOn: true, focusedWindow: 42 });
    const before = useStore.getState();
    const value =
      key === "settingsData"
        ? { ...getDefaultValue(key, false), backgroundColor: "#abcdef" }
        : [];

    syncDesktopFromStorage(storageEvent(key, JSON.stringify(value)));

    expect(useStore.getState()).toEqual({ ...before, [key]: value });
    expect(localStorage.setItem).not.toHaveBeenCalled();

    syncDesktopFromStorage(storageEvent(key, null));

    expect(useStore.getState()[key]).toEqual(getDefaultValue(key, false));
    expect(localStorage.setItem).not.toHaveBeenCalled();
  },
);

it("ignores unrelated keys, other storage areas, and malformed updates", async () => {
  const { useStore } = await import("../Store");
  const { syncDesktopFromStorage } = await import("./sync");
  const before = useStore.getState();

  for (const event of [
    storageEvent("unrelated", "[]"),
    storageEvent(null, null),
    storageEvent("windowData", "[]", {} as Storage),
    storageEvent("windowData", "{broken"),
    storageEvent("iconData", '[{"id":1}]'),
    storageEvent("settingsData", "null"),
  ]) {
    syncDesktopFromStorage(event);

    expect(useStore.getState()).toBe(before);
  }

  expect(localStorage.setItem).not.toHaveBeenCalled();
});
