import create from "zustand";
import { getDefaultValue } from "./functions/helpers";

export const useStore = create((set) => ({
  isEditModeOn: false,
  toggleEditMode: () => set((state) => ({ isEditModeOn: !state.isEditModeOn })),

  isSettingsShowing: false,
  setIsSettingsShowing: (val) => set(() => ({ isSettingsShowing: val })),

  settingsData: getDefaultValue("settingsData"),
  setSettingsData: (val) => set(() => ({ settingsData: val })),

  iconData: getDefaultValue("iconData"),
  setIconData: (val) => set(() => ({ iconData: val })),

  windowData: getDefaultValue("windowData"),
  setWindowData: (val) => set(() => ({ windowData: val })),

  focusedWindow: 0,
  setFocusedWindow: (val) => set(() => ({ focusedWindow: val })),
}));
