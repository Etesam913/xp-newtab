import React, { useRef } from "react";
import styled, { css, withTheme } from "styled-components";
import Draggable from "react-draggable";
import maximizeSecond from "../../media/maximize-second.png";
import {
  handleComponentCreation,
  RenderComponents,
  setDataProperty,
} from "./helper";
import { deleteDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";

function Window({ width, windowItem, windowId, theme }) {
  const windowRef = useRef(null);
  const componentsPanel = useRef(null);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const settingsData = useStore((state) => state.settingsData);

  const focusedWindow = useStore((state) => state.focusedWindow);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);

  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const componentData = ["Header", "Image", "Video", "List", "Search Bar"];
  const components = componentData.map((componentName, index) => {
    return (
      <div className="field-row" key={index}>
        <input
          id={componentName.toLowerCase() + windowId}
          type="radio"
          name="radio-button"
        />
        <WindowLabel htmlFor={componentName.toLowerCase() + windowId}>
          {componentName}
        </WindowLabel>
      </div>
    );
  });

  return (
    <Draggable
      handle={".title-bar"}
      nodeRef={windowRef}
      bounds="#wrapper"
      grid={
        parseInt(settingsData["draggingGrid"]) !== 0 && [
          parseInt(settingsData["draggingGrid"]),
          parseInt(settingsData["draggingGrid"]),
        ]
      }
      position={
        windowItem["isMaximized"]
          ? { x: 0, y: 0 }
          : { x: windowItem["xCoord"], y: windowItem["yCoord"] }
      }
      defaultPosition={{ x: windowItem["xCoord"], y: windowItem["yCoord"] }}
      onStop={() => {
        {
          !windowItem["isMaximized"] &&
            setDataProperty(
              windowData,
              setWindowData,
              windowItem,
              "position",
              windowRef
            );
        }
      }}
    >
      <WindowContainer
        tabIndex={0}
        onFocus={() => {
          setFocusedWindow(windowItem["id"]);
        }}
        notFocused={focusedWindow !== windowItem["id"]}
        ref={windowRef}
        width={width}
        className="window"
        hidden={windowItem["hidden"]}
        isMaximized={windowItem["isMaximized"]}
      >
        <TitleBar
          className="title-bar"
          notFocused={focusedWindow !== windowItem["id"]}
        >
          {isEditModeOn ? (
            <TitleInput
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
            <div className="title-bar-text">{windowItem["windowTitle"]}</div>
          )}

          <ControlButtons
            className="title-bar-controls"
            notFocused={focusedWindow !== windowItem["id"]}
          >
            <TitleBarButton
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
              aria-label="Close"
              onClick={() => {
                deleteDataItem(windowData, setWindowData, windowItem);
              }}
            />
          </ControlButtons>
        </TitleBar>

        <WindowBody className="window-body">
          <WindowPanel isMaximized={windowItem["isMaximized"]} role="tabpanel">
            <RenderComponents
              componentsArr={windowItem["items"]}
              windowObj={windowItem}
              moveCursor={theme.cursors.move}
              autoCursor={theme.cursors.auto}
            />
            {isEditModeOn && (
              <ComponentsPanel ref={componentsPanel}>
                <div className="field-row">Select one component to add:</div>
                {components}
                <AddComponent
                  as={"button"}
                  onClick={() => {
                    handleComponentCreation(
                      componentsPanel,
                      windowData,
                      setWindowData,
                      windowItem
                    );
                  }}
                >
                  Add Component
                </AddComponent>
              </ComponentsPanel>
            )}
          </WindowPanel>
        </WindowBody>
      </WindowContainer>
    </Draggable>
  );
}

const WindowContainer = styled.div`
  display: ${(props) => props.hidden && "none"};
  width: ${(props) => (props.width ? props.width : "20rem")};
  height: auto;
  min-width: 30rem;
  font-family: ${(props) => props.theme.fonts.primary};
  position: absolute;
  box-shadow: ${(props) =>
    props.notFocused && "inset -3px -3px #c7d3e7, inset 3px 3px #c7d3e7"};
  z-index: ${(props) => (props.notFocused ? "2" : "3")};

  :focus {
    outline: none;
  }

  ${(props) =>
    props.isMaximized &&
    css`
      width: 100vw;
      height: calc(100vh - 32px);
      z-index: 4;
    `};
`;

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

const ComponentsPanel = styled.fieldset`
  margin-top: 0.75rem;
`;

const AddComponent = styled(ComponentsPanel)``;
const WindowBody = styled.div`
  height: calc(100% - 2.8rem);
`;

const WindowLabel = styled.label`
  cursor: ${(props) => props.theme.cursors.pointer};
`;

const WindowPanel = styled.article`
  overflow-y: auto;
  box-sizing: border-box;
  max-height: ${(props) => (props.isMaximized ? "100%" : "60vh")};
  height: 100%;
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

export default withTheme(Window);
