import React, { useContext } from "react";
import Toggle from "../Toggle";
import { StartItemIcon, StartItemName, ItemContainer } from "./styles";
import { FlexContainer } from "../../styles/Layout";
import { AppContext } from "../../Contexts";
import newWindowImg from "../../media/new-window-icon.png";
import { addDataItem } from "../../functions/helpers";


export function StartbarItem({ identifier, setIsStartWindowShowing }) {
  const {
    isMenuShowing,
    setIsMenuShowing,
    setIsSettingsShowing,
    windowData,
    setWindowData,
    setFocusedWindow,
    iconData,
    setIconData
  } = useContext(AppContext);

  function handleClick() {
    if (identifier === "Edit Mode")
      setIsMenuShowing(!isMenuShowing);
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
    <ItemContainer
      onClick={() => {
        handleClick();
      }}>
      <FlexContainer
        width={"max-content"}
        cursor={"pointer"}
        padding={"0.5rem"}
        justifyContent={"flex-start"}>
        {identifier === "Edit Mode" && <Toggle stateVal={isMenuShowing} />}
        {identifier === "Settings" &&
        <StartItemIcon
          width={"32px"}
          height={"32px"}
          src="https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/images/Windows%20XP%20Control%20Panel.ico" />
        }
        {identifier === "Create A New Window" && <StartItemIcon width={"32px"} height={"32px"} src={newWindowImg} />}

        <StartItemName>{identifier}</StartItemName>
      </FlexContainer>
    </ItemContainer>
  );
}



