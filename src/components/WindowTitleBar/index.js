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

  return (
    <TitleBar
      data-cy={`window-title-bar-${windowId}`}
      className="title-bar"
      notFocused={focusedWindow !== windowItem["id"]}
    >
      {isEditModeOn ? (
        <TitleInput
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
          aria-label="Maximize"
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
      );
      border: 0;
    `}
`;

const TitleInput = styled.input`
  color: black !important;
  font-family: ${(props) => props.theme.fonts.secondary};
  font-weight: 700;
  font-size: 13px;
  width: 100%;
`;

const ControlButtons = styled.div`
  filter: ${(props) => props.notFocused && "contrast(50%) brightness(120%)"};
  pointer-events: ${(props) => props.notFocused && "none"};
`;

const TitleBarButton = styled.button`
  height: 22px;
  width: 22px;
`;

const MaximizeButton = styled(TitleBarButton)`
  background-image: ${(props) =>
    props.isMaximized && `url(${props.maximizeSecond})`} !important;

  :hover {
    filter: ${(props) => props.isMaximized && "brightness(120%)"};
  }

  :hover:active {
    filter: ${(props) => props.isMaximized && "brightness(90%)"};
  }
`;

export default WindowTitleBar;
