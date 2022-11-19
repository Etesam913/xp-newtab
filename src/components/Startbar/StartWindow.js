import {
  WindowsXPStartBody,
  WindowsXPStartFooter,
  WindowsXPStartHeader,
  WindowsXPStartWindow,
  Windows98StartWindow,
  Windows98BlueStripe,
  Windows98StartBody,
  Windows98BoldText,
  Windows7StartWindow,
} from "./styles";
import startHeaderImg from "../../media/start-header.png";
import startFooterImg from "../../media/start-footer.png";
import React, { Fragment } from "react";
import { WindowsXPStartbarItem, Windows98StartbarItem } from "./items";
import { FlexContainer } from "../../styles/Layout";

function StartWindow({ windowsOS, startWindow, setIsStartWindowShowing }) {
  return (
    <Fragment>
      {windowsOS === 0 && (
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
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
            <WindowsXPStartbarItem
              identifier="Add Icon"
              dataCy="add-icon-menu-item"
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
            <WindowsXPStartbarItem
              identifier="Edit Mode"
              dataCy="edit-mode-menu-item"
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
          </WindowsXPStartBody>
          <WindowsXPStartFooter image={startFooterImg} />
        </WindowsXPStartWindow>
      )}
      {windowsOS === 1 && (
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

      {windowsOS === 2 && (
        <Windows7StartWindow ref={startWindow}>
          <WindowsXPStartBody>
            <WindowsXPStartbarItem
              identifier="Settings"
              setIsStartWindowShowing={setIsStartWindowShowing}
              dataCy="settings-menu-item"
            />
            <WindowsXPStartbarItem
              identifier="Create A New Window"
              dataCy="create-window-menu-item"
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
            <WindowsXPStartbarItem
              identifier="Add Icon"
              dataCy="add-icon-menu-item"
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
            <WindowsXPStartbarItem
              identifier="Edit Mode"
              dataCy="edit-mode-menu-item"
              setIsStartWindowShowing={setIsStartWindowShowing}
            />
          </WindowsXPStartBody>
        </Windows7StartWindow>
      )}
    </Fragment>
  );
}
export default StartWindow;
