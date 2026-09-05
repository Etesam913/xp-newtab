import type { CSSProperties, Dispatch, SetStateAction } from "react";

export type Setter<T> = Dispatch<SetStateAction<T>>;
export type WindowsOS = 0 | 1 | 2;
export interface Settings {
  backgroundColor: string;
  backgroundImage: string;
  draggingGrid: string;
  stylesheet: string;
  windowsOS: WindowsOS;
}
export interface DesktopIcon {
  id: number;
  src: string;
  title: string;
  xCoord: number;
  yCoord: number;
  redirect: string;
}
export interface TextItem {
  id: number;
  componentName: "Text";
  editorState: string | null;
}
export interface ImageItem {
  id: number;
  componentName: "Image";
  href: string | null;
  src: string;
  justifyContent: "flex-start" | "center" | "flex-end";
  imageWidth: string;
}
export interface VideoItem {
  id: number;
  componentName: "YouTube Video";
  src: string;
}
export type SearchEngine = "Google" | "DuckDuckGo" | "Bing";
export interface SearchItem {
  id: number;
  componentName: "Search Bar";
  engine: SearchEngine;
  action: string;
}
export interface KanbanCard {
  id: number;
  text: string;
}
export type KanbanItems = Record<string, KanbanCard[]>;
export type ColumnHeaders = Record<string, string>;
export interface KanbanBoardItem {
  id: number;
  componentName: "Kanban Board";
  items: KanbanItems;
  columnHeaders: ColumnHeaders;
}
export type WindowComponent =
  TextItem | ImageItem | VideoItem | SearchItem | KanbanBoardItem;
export interface DesktopWindow {
  id: number;
  windowTitle: string;
  xCoord: number;
  yCoord: number;
  hidden: boolean;
  items: WindowComponent[];
  isMaximized: boolean;
  size: { width: number; height: number };
}
export interface ComponentProps<T extends WindowComponent> {
  windowObj: DesktopWindow;
  windowItem: T;
}
export type StyleProps = Pick<
  CSSProperties,
  | "padding"
  | "margin"
  | "cursor"
  | "width"
  | "height"
  | "flexWrap"
  | "flexDirection"
  | "justifyContent"
  | "alignItems"
  | "flex"
  | "textAlign"
  | "display"
  | "background"
  | "border"
  | "pointerEvents"
> & {
  windowsOS?: WindowsOS;
  backgroundImage?: string;
  tablet?: boolean;
  notFocused?: boolean;
  isMaximized?: boolean;
  isEditModeOn?: boolean;
  imageWidth?: string;
  $on?: boolean;
  normalImg?: string;
  pressedImg?: string;
  isPressed?: boolean;
  blueBarImg?: string;
  grayBarImg?: string;
  timeBarImg?: string;
  tabBackgroundImg?: string;
  pressed?: boolean;
  active?: boolean;
  image?: string;
  maximizeSecond?: string;
};
