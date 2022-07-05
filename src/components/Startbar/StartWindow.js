import {
  WindowsXPStartBody,
  WindowsXPStartFooter,
  WindowsXPStartHeader,
  WindowsXPStartWindow,
  Windows98StartWindow,
  Windows98BlueStripe,
  Windows98StartBody,
  Windows98BoldText,
} from "./styles";
import startHeaderImg from "../../media/start-header.png";
import startFooterImg from "../../media/start-footer.png";
import React, { Fragment } from "react";
import { WindowsXPStartbarItem, Windows98StartbarItem } from "./items";
import { FlexContainer } from "../../styles/Layout";

function StartWindow({ isWindowsXP, startWindow, setIsStartWindowShowing }) {
  return (
    <Fragment>
      {isWindowsXP ? (
        <WindowsXPStartWindow ref={startWindow}>
          <WindowsXPStartHeader image={startHeaderImg}>
            Administrator
          </WindowsXPStartHeader>
          <WindowsXPStartBody>
            <WindowsXPStartbarItem
              identifier="Settings"
              setIsStartWindowShowing={setIsStartWindowShowing}
              dataCy="settings-menu-item"
            />
            <WindowsXPStartbarItem
              identifier="Create A New Window"
              dataCy="create-window-menu-item"
            />
            <WindowsXPStartbarItem
              identifier="Add Icon"
              dataCy="add-icon-menu-item"
            />
            <WindowsXPStartbarItem
              identifier="Edit Mode"
              dataCy="edit-mode-menu-item"
            />
          </WindowsXPStartBody>
          <WindowsXPStartFooter image={startFooterImg} />
        </WindowsXPStartWindow>
      ) : (
        <Windows98StartWindow ref={startWindow}>
          <FlexContainer
            height="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Windows98BlueStripe>
              <Windows98BoldText>Windows</Windows98BoldText>98
            </Windows98BlueStripe>
            <Windows98StartBody>
              <Windows98StartbarItem
                identifier="Settings"
                setIsStartWindowShowing={setIsStartWindowShowing}
                dataCy="settings-menu-item"
              />
              <Windows98StartbarItem
                identifier="Create A New Window"
                dataCy="create-window-menu-item"
              />
              <Windows98StartbarItem
                identifier="Add Icon"
                dataCy="add-icon-menu-item"
              />
              <Windows98StartbarItem
                identifier="Edit Mode"
                dataCy="edit-mode-menu-item"
              />
            </Windows98StartBody>
          </FlexContainer>
        </Windows98StartWindow>
      )}
    </Fragment>
  );
}
export default StartWindow;