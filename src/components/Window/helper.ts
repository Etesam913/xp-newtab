import type { RefObject } from "react";
import type {
  DesktopWindow,
  DesktopIcon,
  Setter,
  WindowComponent,
} from "../../types";
import { getMaxId, getTranslateXY } from "../../functions/helpers";

export function handleComponentCreation(
  ref: RefObject<HTMLElement | null>,
  data: DesktopWindow[],
  setData: Setter<DesktopWindow[]>,
  window: DesktopWindow,
) {
  const selected =
    ref.current?.querySelector<HTMLInputElement>("input:checked")?.value;
  if (selected) addComponent(selected, data, setData, window);
}
export function createComponent(
  name: string,
  id: number,
): WindowComponent | null {
  switch (name) {
    case "Text":
      return { id, componentName: name, editorState: null };
    case "Image":
      return {
        id,
        componentName: name,
        src: "./assets/image-placeholder.svg",
        href: null,
        justifyContent: "flex-start",
        imageWidth: "50%",
      };
    case "YouTube Video":
      return {
        id,
        componentName: name,
        src: "https://www.youtube.com/embed/5pzM_pFNWak",
      };
    case "Search Bar":
      return {
        id,
        componentName: name,
        engine: "Google",
        action: "https://www.google.com/search",
      };
    case "Kanban Board":
      return {
        id,
        componentName: name,
        columnHeaders: { A: "To Do", B: "Doing", C: "Done" },
        items: {
          A: [
            { id: 1, text: "🐶 Walk the dog" },
            { id: 2, text: "🖊 Give this app a review" },
          ],
          B: [{ id: 3, text: "📝 Finish my homework" }],
          C: [],
        },
      };
    default:
      return null;
  }
}
export function addComponent(
  name: string,
  _data: DesktopWindow[],
  setData: Setter<DesktopWindow[]>,
  window: DesktopWindow,
) {
  setData((current) =>
    current.map((candidate) => {
      if (candidate.id !== window.id) return candidate;
      const item = createComponent(name, getMaxId(candidate.items) + 1);
      return item
        ? { ...candidate, items: [...candidate.items, item] }
        : candidate;
    }),
  );
}
export function setDataProperty<
  T extends DesktopWindow | DesktopIcon,
  K extends keyof T,
>(data: T[], setData: Setter<T[]>, item: T, property: K, value: T[K]): void;
export function setDataProperty<T extends DesktopWindow | DesktopIcon>(
  data: T[],
  setData: Setter<T[]>,
  item: T,
  property: "position",
  value: RefObject<HTMLElement | null>,
): void;
export function setDataProperty<T extends DesktopWindow | DesktopIcon>(
  _data: T[],
  setData: Setter<T[]>,
  item: T,
  property: keyof T | "position",
  value: T[keyof T] | RefObject<HTMLElement | null>,
) {
  if (property === "position") {
    const element = (value as RefObject<HTMLElement | null>).current;
    if (!element) return;
    const { translateX, translateY } = getTranslateXY(element);
    setData((current) =>
      current.map((candidate) =>
        candidate.id === item.id
          ? { ...candidate, xCoord: translateX, yCoord: translateY }
          : candidate,
      ),
    );
  } else {
    setData((current) =>
      current.map((candidate) =>
        candidate.id === item.id
          ? { ...candidate, [property]: value }
          : candidate,
      ),
    );
  }
}
export function changeItemProperty<
  T extends WindowComponent,
  K extends keyof T,
>(
  window: DesktopWindow,
  _data: DesktopWindow[],
  setData: Setter<DesktopWindow[]>,
  item: T,
  property: K,
  value: T[K],
) {
  setData((current) =>
    current.map((candidate) =>
      candidate.id === window.id
        ? {
            ...candidate,
            items: candidate.items.map((component) =>
              component.id === item.id
                ? { ...component, [property]: value }
                : component,
            ),
          }
        : candidate,
    ),
  );
}
export function handleDelete(
  _data: DesktopWindow[],
  setData: Setter<DesktopWindow[]>,
  window: DesktopWindow,
  id: number,
) {
  setData((current) =>
    current.map((candidate) =>
      candidate.id === window.id
        ? {
            ...candidate,
            items: candidate.items.filter((item) => item.id !== id),
          }
        : candidate,
    ),
  );
}
