import type { Setter, DesktopWindow, DesktopIcon } from "../../types";
interface MenuItemProps {
  identifier: string;
  setIsStartWindowShowing: Setter<boolean>;
  dataCy: string;
}
import Toggle from "../Toggle";
import {
  StartItemIcon,
  StartItemName,
  Windows98ItemContainer,
  WindowsXPItemContainer,
} from "./styles";
import { FlexContainer } from "../../styles/Layout";
import newWindowImg from "../../media/new-window-icon.png";
import newIconImg from "../../media/new-icon-icon.png";
import { addDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";

function handleClick(
  identifier: string,
  toggleEditMode: () => void,
  setIsSettingsShowing: (value: boolean) => void,
  setIsStartWindowShowing: Setter<boolean>,
  windowData: DesktopWindow[],
  setWindowData: Setter<DesktopWindow[]>,
  setFocusedWindow: (value: number) => void,
  iconData: DesktopIcon[],
  setIconData: Setter<DesktopIcon[]>,
) {
  if (identifier === "Edit Mode") toggleEditMode();
  else if (identifier === "Settings") {
    setIsSettingsShowing(true);
    setIsStartWindowShowing(false);
  } else if (identifier === "Create A New Window") {
    addDataItem(windowData, setWindowData, "window", setFocusedWindow);
    setIsStartWindowShowing(false);
  } else if (identifier === "Add Icon") {
    addDataItem(iconData, setIconData, "icon");
    setIsStartWindowShowing(false);
  }
}

export function WindowsXPStartbarItem({
  identifier,
  setIsStartWindowShowing,
  dataCy,
}: MenuItemProps) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const iconData = useStore((state) => state.iconData);
  const setIconData = useStore((state) => state.setIconData);

  const setFocusedWindow = useStore((state) => state.setFocusedWindow);
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const toggleEditMode = useStore((state) => state.toggleEditMode);
  const setIsSettingsShowing = useStore((state) => state.setIsSettingsShowing);

  return (
    <WindowsXPItemContainer
      onClick={() =>
        handleClick(
          identifier,
          toggleEditMode,
          setIsSettingsShowing,
          setIsStartWindowShowing,
          windowData,
          setWindowData,
          setFocusedWindow,
          iconData,
          setIconData,
        )
      }
      data-cy={dataCy}
    >
      <FlexContainer
        width={"max-content"}
        padding={"0.5rem"}
        justifyContent={"flex-start"}
      >
        {identifier === "Edit Mode" && (
          <Toggle stateVal={isEditModeOn} pointerEvents="none" />
        )}
        {identifier === "Settings" && (
          <StartItemIcon
            width={"32px"}
            height={"32px"}
            src="./assets/images/Windows XP Control Panel.ico"
          />
        )}
        {identifier === "Create A New Window" && (
          <StartItemIcon width={"32px"} height={"32px"} src={newWindowImg} />
        )}
        {identifier === "Add Icon" && (
          <StartItemIcon width={"32px"} height={"32px"} src={newIconImg} />
        )}
        <StartItemName>{identifier}</StartItemName>
      </FlexContainer>
    </WindowsXPItemContainer>
  );
}

export function Windows98StartbarItem({
  identifier,
  setIsStartWindowShowing,
  dataCy,
}: MenuItemProps) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const iconData = useStore((state) => state.iconData);
  const setIconData = useStore((state) => state.setIconData);

  const setFocusedWindow = useStore((state) => state.setFocusedWindow);
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const toggleEditMode = useStore((state) => state.toggleEditMode);
  const setIsSettingsShowing = useStore((state) => state.setIsSettingsShowing);

  return (
    <Windows98ItemContainer
      data-cy={dataCy}
      onClick={() =>
        handleClick(
          identifier,
          toggleEditMode,
          setIsSettingsShowing,
          setIsStartWindowShowing,
          windowData,
          setWindowData,
          setFocusedWindow,
          iconData,
          setIconData,
        )
      }
    >
      <FlexContainer
        width={"max-content"}
        cursor={"pointer"}
        padding={"0.5rem"}
        justifyContent={"flex-start"}
      >
        {identifier === "Edit Mode" && (
          <Toggle stateVal={isEditModeOn} pointerEvents="none" />
        )}
        {identifier === "Settings" && (
          <StartItemIcon
            width={"32px"}
            height={"32px"}
            src="./assets/images/Windows XP Control Panel.ico"
          />
        )}
        {identifier === "Create A New Window" && (
          <StartItemIcon width={"32px"} height={"32px"} src={newWindowImg} />
        )}
        {identifier === "Add Icon" && (
          <StartItemIcon width={"32px"} height={"32px"} src={newIconImg} />
        )}
        <StartItemName>{identifier}</StartItemName>
      </FlexContainer>
    </Windows98ItemContainer>
  );
}
