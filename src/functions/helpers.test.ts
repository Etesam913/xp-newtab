import { expect, it, vi } from "vitest";
import {
  addDataItem,
  deleteDataItem,
  getDefaultValue,
  updateSetting,
  toggleEditOnKeyPress,
} from "./helpers";
import type { DesktopWindow, DesktopIcon, Setter } from "../types";

function stateCell<T>(initial: T) {
  let current = initial;
  const set: Setter<T> = (value) => {
    current =
      typeof value === "function"
        ? (value as (current: T) => T)(current)
        : value;
  };
  return { get: () => current, set };
}

it("creates windows from current state with unique IDs and focuses each new window", () => {
  const stale = getDefaultValue("windowData", false);
  const current = [{ ...stale[0], id: 9, windowTitle: "Existing" }];
  const state = stateCell<DesktopWindow[]>(current);
  const focus = vi.fn();

  addDataItem(stale, state.set, "window", focus);
  addDataItem(stale, state.set, "window", focus);

  expect(state.get().map((window) => window.id)).toEqual([9, 10, 11]);
  expect(focus.mock.calls).toEqual([[10], [11]]);
  expect(current).toEqual([{ ...stale[0], id: 9, windowTitle: "Existing" }]);
  expect(state.get()[1].items).not.toBe(state.get()[2].items);
});

it("adds and deletes icons without restoring items from stale state", () => {
  const stale = getDefaultValue("iconData", false);
  const state = stateCell<DesktopIcon[]>([]);

  addDataItem(stale, state.set, "icon");
  addDataItem(stale, state.set, "icon");

  expect(state.get().map((icon) => icon.id)).toEqual([1, 2]);

  deleteDataItem(stale, state.set, state.get()[0]);

  expect(state.get().map((icon) => icon.id)).toEqual([2]);

  deleteDataItem(stale, state.set, stale[0]);

  expect(state.get().map((icon) => icon.id)).toEqual([2]);
  expect(stale).toEqual(getDefaultValue("iconData", false));
});

it("updates a setting without losing intervening settings edits", () => {
  const stale = getDefaultValue("settingsData", false);
  const state = stateCell(stale);

  updateSetting(stale, state.set, "backgroundColor", "#abcdef");
  updateSetting(stale, state.set, "draggingGrid", "30px");

  expect(state.get()).toEqual({
    ...stale,
    backgroundColor: "#abcdef",
    draggingGrid: "30px",
  });
  expect(stale).toEqual(getDefaultValue("settingsData", false));
});

it.each([
  { key: "e", ctrlKey: true, metaKey: false, repeat: false, toggles: true },
  { key: "E", ctrlKey: false, metaKey: true, repeat: false, toggles: true },
  { key: "e", ctrlKey: true, metaKey: false, repeat: true, toggles: false },
  { key: "e", ctrlKey: false, metaKey: false, repeat: false, toggles: false },
  { key: "s", ctrlKey: true, metaKey: false, repeat: false, toggles: false },
])(
  "handles edit shortcut $key ctrl=$ctrlKey meta=$metaKey repeat=$repeat",
  ({ toggles, ...keys }) => {
    const preventDefault = vi.fn();
    const toggle = vi.fn();

    toggleEditOnKeyPress(
      { ...keys, preventDefault } as unknown as KeyboardEvent,
      toggle,
    );

    expect(toggle).toHaveBeenCalledTimes(toggles ? 1 : 0);
    expect(preventDefault).toHaveBeenCalledTimes(toggles ? 1 : 0);
  },
);
