import type { DesktopWindow, Settings } from "../../types";
import type { StyleProps } from "../../types";
import { useRef } from "react";
import styled, { css } from "styled-components";
import Draggable from "react-draggable";
import { handleComponentCreation, setDataProperty } from "./helper";
import { useStore } from "../../Store";
import WindowTitleBar from "../WindowTitleBar";
import { Resizable } from "re-resizable";
import RenderWindowComponents from "./RenderWindowComponents";

function Window({
  windowItem,
  windowId,
}: {
  windowItem: DesktopWindow;
  windowId: number;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const componentsPanel = useRef<HTMLFieldSetElement>(null);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const settingsData = useStore((state) => state.settingsData);

  const focusedWindow = useStore((state) => state.focusedWindow);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);

  const isEditModeOn = useStore((state) => state.isEditModeOn);

  const componentData = [
    "Text",
    "Image",
    "Kanban Board",
    "YouTube Video",
    "Search Bar",
  ];
  const componentOptions = componentData.map((componentName, index) => {
    return (
      <div className="field-row" key={index}>
        <input
          id={componentName.toLowerCase() + windowId}
          type="radio"
          name={`components-${windowItem.id}`}
          value={componentName}
        />
        <WindowLabel
          data-cy={`${componentName.toLowerCase()}-option-${windowId}`}
          htmlFor={componentName.toLowerCase() + windowId}
        >
          {componentName}
        </WindowLabel>
      </div>
    );
  });

  return (
    <Draggable
      handle={".title-bar"}
      cancel="button,input"
      disabled={windowItem.isMaximized}
      nodeRef={windowRef}
      bounds="#wrapper"
      grid={
        parseInt(settingsData["draggingGrid"]) !== 0
          ? [
              parseInt(settingsData["draggingGrid"]),
              parseInt(settingsData["draggingGrid"]),
            ]
          : undefined
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
            windowRef,
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
        className="window active"
        hidden={windowItem["hidden"]}
        isMaximized={windowItem["isMaximized"]}
      >
        <WindowTitleBar windowItem={windowItem} windowId={windowId} />
        <Resizable
          size={{
            width: windowItem["isMaximized"]
              ? "100%"
              : windowItem["size"]["width"],
            height: windowItem["isMaximized"]
              ? "100%"
              : windowItem["size"]["height"],
          }}
          enable={{
            topRight: false,
            topLeft: false,
            bottomRight: !windowItem["isMaximized"],
            bottomLeft: false,
          }}
          minWidth="275"
          minHeight={
            isEditModeOn ? "250px" : 70 + 80 * windowItem["items"].length + "px"
          }
          maxWidth={windowItem["isMaximized"] ? "calc(100% - 0.15rem)" : "80vw"}
          maxHeight={windowItem["isMaximized"] ? "calc(100% - 2rem)" : "80vh"}
          onResizeStop={(_e, _direction, _ref, d) => {
            setDataProperty(windowData, setWindowData, windowItem, "size", {
              width: windowItem["size"]["width"] + d.width,
              height: windowItem["size"]["height"] + d.height,
            });
          }}
          handleComponent={{
            bottomRight: <BottomRightHandle settingsData={settingsData} />,
          }}
        >
          <WindowBody className="window-body">
            <WindowPanel
              isMaximized={windowItem["isMaximized"]}
              role="tabpanel"
            >
              <RenderWindowComponents
                componentsArr={windowItem["items"]}
                windowItem={windowItem}
              />

              {isEditModeOn && (
                <ComponentsPanel ref={componentsPanel}>
                  <div className="field-row">Select one component to add:</div>
                  {componentOptions}
                  <AddComponent
                    as={"button"}
                    data-cy={`add-component-button-${windowId}`}
                    onClick={() => {
                      handleComponentCreation(
                        componentsPanel,
                        windowData,
                        setWindowData,
                        windowItem,
                      );
                    }}
                  >
                    Add Component
                  </AddComponent>
                </ComponentsPanel>
              )}
            </WindowPanel>
          </WindowBody>
        </Resizable>
      </WindowContainer>
    </Draggable>
  );
}

function BottomRightHandle({ settingsData }: { settingsData: Settings }) {
  return <ResizableDots windowsOS={settingsData["windowsOS"]} />;
}

const WindowContainer = styled.div<StyleProps>`
  display: ${(props) => props.hidden && "none"};
  height: auto;

  font-family: ${(props) => props.theme.fonts.primary};
  position: absolute !important;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.notFocused &&
    "inset -3px -3px #c7d3e7, inset 3px 3px #c7d3e7"} !important;
  z-index: ${(props) => (props.notFocused ? "2" : "3")} !important;
  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isMaximized &&
    css`
      width: 100vw;
      height: 100%;
      z-index: 4 !important;
    `};
`;

const ComponentsPanel = styled.fieldset<StyleProps>`
  margin-top: 0.75rem;
`;

const AddComponent = styled(ComponentsPanel)<StyleProps>``;
const WindowBody = styled.div<StyleProps>`
  height: calc(100% - 0.65rem);
`;

const WindowLabel = styled.label<StyleProps>`
  cursor: ${(props) => props.theme.cursors.pointer};
`;

const WindowPanel = styled.article<StyleProps>`
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
`;

const ResizableDots = styled.div<StyleProps>`
  position: relative;
  ${(props) =>
    props.windowsOS === 0 &&
    css`
      width: 2px;
      height: 2px;

      right: 27%;
      bottom: -34%;
      box-shadow:
        rgba(0, 0, 0, 0.25) 2px 0,
        rgba(0, 0, 0, 0.25) 5.5px 0,
        rgba(0, 0, 0, 0.25) 9px 0,
        rgba(0, 0, 0, 0.25) 5.5px -3.5px,
        rgba(0, 0, 0, 0.25) 9px -3.5px,
        rgba(0, 0, 0, 0.25) 9px -7px,
        rgb(255, 255, 255) 3px 1px,
        rgb(255, 255, 255) 6.5px 1px,
        rgb(255, 255, 255) 10px 1px,
        rgb(255, 255, 255) 10px -2.5px,
        rgb(255, 255, 255) 10px -6px;
    `}
  ${(props) =>
    props.windowsOS === 1 &&
    css`
      width: 12.5px;
      height: 12.5px;
      background-image: linear-gradient(
        135deg,
        rgb(254, 254, 254) 16.67%,
        rgb(198, 198, 198) 16.67%,
        rgb(198, 198, 198) 33.33%,
        rgb(132, 133, 132) 33.33%,
        rgb(132, 133, 132) 50%,
        rgb(254, 254, 254) 50%,
        rgb(254, 254, 254) 66.67%,
        rgb(198, 198, 198) 66.67%,
        rgb(198, 198, 198) 83.33%,
        rgb(132, 133, 132) 83.33%,
        rgb(132, 133, 132) 100%
      );
      background-size: 5px 5px;
      clip-path: polygon(100% 0px, 0px 100%, 100% 100%);
      bottom: 10%;
      right: 12%;
    `}

    ${(props) =>
      props.windowsOS === 2 &&
      css`
        width: 2px;
        height: 2px;

        right: 27%;
        bottom: -34%;
        box-shadow: none;
      `}
`;

export default Window;
