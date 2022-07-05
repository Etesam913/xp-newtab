import React, { useRef } from "react";
import styled, { css, withTheme } from "styled-components";
import Draggable from "react-draggable";
import {
  handleComponentCreation,
  RenderComponents,
  setDataProperty,
} from "./helper";
import { useStore } from "../../Store";
import WindowTitleBar from "../WindowTitleBar";

function Window({ width, windowItem, windowId, theme }) {
  const windowRef = useRef(null);
  const componentsPanel = useRef(null);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const settingsData = useStore((state) => state.settingsData);

  const focusedWindow = useStore((state) => state.focusedWindow);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);

  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const componentData = ["Text", "Image", "Video", "Search Bar"];
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
        !windowItem["isMaximized"] &&
          setDataProperty(
            windowData,
            setWindowData,
            windowItem,
            "position",
            windowRef
          );
      }}
    >
      <WindowContainer
        data-cy={`window-${windowId}`}
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
        <WindowTitleBar windowItem={windowItem} windowId={windowId} />
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
  width: ${(props) => (props.width ? props.width : "35rem")};
  height: auto;
  min-width: 30rem;
  font-family: ${(props) => props.theme.fonts.primary};
  position: absolute;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.notFocused &&
    "inset -3px -3px #c7d3e7, inset 3px 3px #c7d3e7"} !important;
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

export default withTheme(Window);
