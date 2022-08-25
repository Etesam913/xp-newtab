import React from "react";
import { setDataProperty } from "../Window/helper";
import maximizeSecond from "../../media/maximize-second.png";
import { deleteDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";
import styled, { css } from "styled-components";

function WindowTitleBar({ windowItem, windowId }) {
  const isEditModeOn = useStore((state) => state.isEditModeOn);
  const focusedWindow = useStore((state) => state.focusedWindow);
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const settingsData = useStore((state) => state.settingsData);

  return (
    <TitleBar
      data-cy={`window-title-bar-${windowId}`}
      className="title-bar"
      notFocused={focusedWindow !== windowItem["id"]}
    >
      {isEditModeOn ? (
        <TitleInput
          type="text"
          data-cy={`window-title-edit-${windowId}`}
          className="title-bar-text"
          value={windowItem["windowTitle"]}
          onChange={(e) => {
            setDataProperty(
              windowData,
              setWindowData,
              windowItem,
              "windowTitle",
              e.target.value
            );
          }}
        />
      ) : (
        <div
          data-cy={`window-title-display-${windowId}`}
          className="title-bar-text"
        >
          {windowItem["windowTitle"]}
        </div>
      )}

      <ControlButtons
        className="title-bar-controls"
        notFocused={focusedWindow !== windowItem["id"]}
      >
        <TitleBarButton
          isWindowsXP={settingsData["isWindowsXP"]}
          data-cy={`minimize-button-${windowId}`}
          aria-label="Minimize"
          onClick={() => {
            setDataProperty(
              windowData,
              setWindowData,
              windowItem,
              "hidden",
              true
            );
          }}
        />
        <MaximizeButton
          data-cy={`maximize-button-${windowId}`}
          aria-label={
            !settingsData["isWindowsXP"] && windowItem["isMaximized"]
              ? "Restore"
              : "Maximize"
          }
          isWindowsXP={settingsData["isWindowsXP"]}
          isMaximized={windowItem["isMaximized"]}
          maximizeSecond={maximizeSecond}
          onClick={() => {
            setDataProperty(
              windowData,
              setWindowData,
              windowItem,
              "isMaximized",
              !windowItem["isMaximized"]
            );
          }}
        />
        <TitleBarButton
          isWindowsXP={settingsData["isWindowsXP"]}
          data-cy={`close-button-${windowId}`}
          aria-label="Close"
          onClick={() => {
            deleteDataItem(windowData, setWindowData, windowItem);
          }}
        />
      </ControlButtons>
    </TitleBar>
  );
}

const TitleBar = styled.div`
  cursor: ${(props) => props.theme.cursors.move};
  ${(props) =>
    props.notFocused &&
    css`
      background: linear-gradient(
        180deg,
        #9db4f6,
        #8296e3 8%,
        #8394e0 40%,
        #8da6eb 88%,
        #8da6eb 93%,
        #a3b5e6 95%,
        #93bbdd 96%,
        #a8c0ff
      ) !important;
      border: 0 !important;
    `}
`;

const TitleInput = styled.input`
  color: black !important;
  font-weight: 700;
  font-size: 13px;
  width: 100%;
  padding: 0 0 0 3px !important;
`;

const ControlButtons = styled.div`
  filter: ${(props) => props.notFocused && "contrast(50%) brightness(120%)"};
  pointer-events: ${(props) => props.notFocused && "none"};
`;

export const TitleBarButton = styled.button`
  ${(props) =>
    props.isWindowsXP &&
    css`
      height: 22px;
      width: 22px;
    `}

  ${(props) =>
    !props.isWindowsXP &&
    css`
      height: 14px;
      width: 16px;
    `}
`;

const MaximizeButton = styled(TitleBarButton)`
  ${(props) =>
    props.isWindowsXP &&
    css`
      background-image: ${(props) =>
        props.isMaximized && `url(${props.maximizeSecond})`} !important;

      :hover {
        filter: ${(props) => props.isMaximized && "brightness(120%)"};
      }

      :hover:active {
        filter: ${(props) => props.isMaximized && "brightness(90%)"};
      }
    `}
`;

export default WindowTitleBar;
