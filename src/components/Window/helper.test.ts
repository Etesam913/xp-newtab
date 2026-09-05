import { expect, it } from "vitest";
import {
  addComponent,
  changeItemProperty,
  createComponent,
  handleDelete,
} from "./helper";
import { getDefaultValue } from "../../functions/helpers";
import type { DesktopWindow, Setter } from "../../types";

it("adds, edits, and removes components immutably using the current saved window", () => {
  const original = getDefaultValue("windowData", false);
  let state: DesktopWindow[] = original;
  const setState: Setter<DesktopWindow[]> = (update) => {
    state = typeof update === "function" ? update(state) : update;
  };
  addComponent("Image", original, setState, original[0]);
  addComponent("Text", original, setState, original[0]);
  expect(original[0].items).toEqual([]);
  expect(state[0].items.map((item) => item.id)).toEqual([1, 2]);
  const text = state[0].items[1];
  if (text.componentName !== "Text") throw new Error("Expected text");
  changeItemProperty(
    original[0],
    original,
    setState,
    text,
    "editorState",
    '{"root":{}}',
  );
  expect(state[0].items[0].componentName).toBe("Image");
  expect(state[0].items[1]).toMatchObject({ editorState: '{"root":{}}' });
  handleDelete(original, setState, original[0], 1);
  expect(state[0].items.map((item) => item.id)).toEqual([2]);
});
it("ignores unknown component names", () =>
  expect(createComponent("unknown", 1)).toBeNull());
