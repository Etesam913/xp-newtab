import React, { useRef, useContext } from "react";
import styled, { css, withTheme } from "styled-components";
import Draggable from "react-draggable";
import {
  handleComponentCreation,
  RenderComponents,
  setDataProperty
} from "./helper";
import { AppContext } from "../../Contexts";
import { deleteDataItem } from "../../functions/helpers";

function Window({ width, windowItem, windowId, theme }) {
  const windowRef = useRef(null);
  const componentsPanel = useRef(null);
  const {
    windowData,
    setWindowData,
    isEditModeOn,
    settingsData,
    focusedWindow,
    setFocusedWindow
  } = useContext(AppContext);

  const componentData=["Header", "Image", "Video", "List"]
  const components = componentData.map((componentName, index)=>{
    return(
      <div className="field-row" key={index}>
        <input id={componentName.toLowerCase() + windowId} type="radio" name="radio-button" />
        <WindowLabel htmlFor={componentName.toLowerCase() + windowId}>{componentName}</WindowLabel>
      </div>
    );
  })

  return (
    <Draggable
      handle={".title-bar"}
      nodeRef={windowRef}
      bounds="#wrapper"
      grid={
        parseInt(settingsData["draggingGrid"]) !== 0 &&
        [parseInt(settingsData["draggingGrid"]), parseInt(settingsData["draggingGrid"])]
      }
      defaultPosition={{ x: windowItem["xCoord"], y: windowItem["yCoord"] }}
      onStop={() => {
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
        tabIndex={0}
        onFocus={() => {
          setFocusedWindow(windowItem["id"]);
        }}
        notFocused={focusedWindow !== windowItem["id"]}
        ref={windowRef}
        width={width}
        className="window"
        hidden={windowItem["hidden"]}
      >
        <TitleBar className="title-bar" notFocused={focusedWindow !== windowItem["id"]}>
          {isEditModeOn
            ?
            <TitleInput
              className="title-bar-text" value={windowItem["windowTitle"]}
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
            :
            <div className="title-bar-text">
              {windowItem["windowTitle"]}
            </div>
          }

          <ControlButtons className="title-bar-controls" notFocused={focusedWindow !== windowItem["id"]}>
            <button
              aria-label="Minimize"
              onClick={() => {
                setDataProperty(windowData, setWindowData, windowItem, "hidden", true);
              }} />

            <button
              aria-label="Close"
              onClick={() => {
                deleteDataItem(windowData, setWindowData, windowItem);
              }}
            />
          </ControlButtons>
        </TitleBar>

        <div className="window-body">
          <WindowPanel role="tabpanel">
            <RenderComponents
              componentsArr={windowItem["items"]}
              windowObj={windowItem}
              moveCursor={theme.cursors.move}
              autoCursor={theme.cursors.auto}/>
            {isEditModeOn &&
            <ComponentsPanel ref={componentsPanel}>
              <div className="field-row">Select one component to add:</div>
              {components}
              <AddComponent
                as={"button"}
                onClick={() => {
                  handleComponentCreation(componentsPanel, windowData, setWindowData, windowItem);
                }}>
                Add Component
              </AddComponent>
            </ComponentsPanel>}
          </WindowPanel>
        </div>
      </WindowContainer>
    </Draggable>
  );
}

const WindowContainer = styled.div`
  display: ${props => props.hidden && "none"};
  width: ${(props) => (props.width ? props.width : "20rem")};
  height: auto;
  min-width: 30rem;
  font-family: ${props => props.theme.fonts.primary};
  position: absolute;
  box-shadow: ${props => props.notFocused && "inset -3px -3px #c7d3e7, inset 3px 3px #c7d3e7"};
  z-index: ${props => props.notFocused ? "2" : "3"};

  :focus {
    outline: none;
  }
`;

const TitleBar = styled.div`
  cursor: ${props => props.theme.cursors.move};
  ${props => props.notFocused && css`
    background: linear-gradient(180deg, #9db4f6, #8296e3 8%, #8394e0 40%, #8da6eb 88%, #8da6eb 93%, #a3b5e6 95%, #93bbdd 96%, #a8c0ff);
    border: 0;
  `}

`;
const TitleInput = styled.input`
  color: black !important;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: 700;
  font-size: 13px;
  width: 100%;
`;

const ControlButtons = styled.div`
  filter: ${props => props.notFocused && "contrast(50%) brightness(120%)"};
  pointer-events: ${props => props.notFocused && "none"};
`;

const ComponentsPanel = styled.fieldset`
  margin-top: 0.75rem;
`;

const AddComponent = styled(ComponentsPanel)`
`;

const WindowLabel = styled.label`
  cursor: ${props => props.theme.cursors.pointer};
`;

const WindowPanel = styled.article`
  max-height: 60vh;
  overflow-y: auto;
  height: 100%;
`;

export default withTheme(Window);

