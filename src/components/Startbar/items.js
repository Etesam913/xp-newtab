import React from "react";
import Toggle from "../Toggle";
import { StartItemIcon, StartItemName, ItemContainer } from "./styles";
import { FlexContainer } from "../../styles/Layout";
import newWindowImg from "../../media/new-window-icon.png";
import newIconImg from "../../media/new-icon-icon.png";
import { addDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";

export function StartbarItem({ identifier, setIsStartWindowShowing, dataCy }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const iconData = useStore((state) => state.iconData);
  const setIconData = useStore((state) => state.setIconData);

  const setFocusedWindow = useStore((state) => state.setFocusedWindow);
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const toggleEditMode = useStore((state) => state.toggleEditMode);
  const setIsSettingsShowing = useStore((state) => state.setIsSettingsShowing);

  function handleClick() {
    if (identifier === "Edit Mode") toggleEditMode();
    else if (identifier === "Settings") {
      setIsSettingsShowing(true);
      setIsStartWindowShowing(false);
    } else if (identifier === "Create A New Window") {
      addDataItem(windowData, setWindowData, "window", setFocusedWindow);
    } else if (identifier === "Add Icon") {
      addDataItem(iconData, setIconData, "icon");
    }
  }

  return (
    <ItemContainer data-cy={identifier} onClick={handleClick} data-cy={dataCy}>
      <FlexContainer
        width={"max-content"}
        cursor={"pointer"}
        padding={"0.5rem"}
        justifyContent={"flex-start"}
      >
        {identifier === "Edit Mode" && (
          <Toggle stateVal={isEditModeOn} toggleStateVal={toggleEditMode} />
        )}
        {identifier === "Settings" && (
          <StartItemIcon
            width={"32px"}
            height={"32px"}
            src="https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/Windows%20XP%20Control%20Panel.ico"
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
    </ItemContainer>
  );
}
