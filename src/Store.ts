import { create } from "zustand";
import { getDefaultValue } from "./functions/helpers";
import { saveData, hasStorageErrors } from "./functions/storage";
import type { DesktopIcon, DesktopWindow, Setter, Settings } from "./types";

interface Store {
  isEditModeOn: boolean;
  toggleEditMode: () => void;
  isSettingsShowing: boolean;
  setIsSettingsShowing: (value: boolean) => void;
  settingsData: Settings;
  setSettingsData: Setter<Settings>;
  iconData: DesktopIcon[];
  setIconData: Setter<DesktopIcon[]>;
  windowData: DesktopWindow[];
  setWindowData: Setter<DesktopWindow[]>;
  focusedWindow: number;
  setFocusedWindow: (value: number) => void;
  storageError: boolean;
}
export const useStore = create<Store>((set) => ({
  isEditModeOn: false,
  toggleEditMode: () => set((state) => ({ isEditModeOn: !state.isEditModeOn })),
  isSettingsShowing: false,
  setIsSettingsShowing: (value) => set({ isSettingsShowing: value }),
  settingsData: getDefaultValue("settingsData"),
  setSettingsData: (value) =>
    set((state) => {
      const settingsData =
        typeof value === "function" ? value(state.settingsData) : value;
      return {
        settingsData,
        storageError:
          !saveData("settingsData", settingsData) || hasStorageErrors(),
      };
    }),
  iconData: getDefaultValue("iconData"),
  setIconData: (value) =>
    set((state) => {
      const iconData =
        typeof value === "function" ? value(state.iconData) : value;
      return {
        iconData,
        storageError: !saveData("iconData", iconData) || hasStorageErrors(),
      };
    }),
  windowData: getDefaultValue("windowData"),
  setWindowData: (value) =>
    set((state) => {
      const windowData =
        typeof value === "function" ? value(state.windowData) : value;
      return {
        windowData,
        storageError: !saveData("windowData", windowData) || hasStorageErrors(),
      };
    }),
  focusedWindow: 0,
  setFocusedWindow: (value) => set({ focusedWindow: value }),
  storageError: hasStorageErrors(),
}));
