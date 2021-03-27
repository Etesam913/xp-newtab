import React, { useState, useContext } from "react";
import styled from "styled-components";
import { handleEnter } from "./helper";
import { setWindowProperty } from "../Window/helper";
import { AppContext } from "../../Contexts";

function WindowTitleText({ windowItem, disabled }) {
  const [isEditing, setIsEditing] = useState(false);
  const { windowData, setWindowData } = useContext(AppContext);

  // TODO isEditing should be set to true on double click
  return (
    <li>
      {isEditing ? (
        <WindowInput
          defaultValue={windowItem["windowTitle"]}
          autoFocus
          onKeyDown={(e) => {
            handleEnter(
              e,
              windowData,
              setWindowData,
              windowItem,
              "windowTitle",
              e.target.value,
              setIsEditing
            );

          }}
          onBlur={(e) => {
            setIsEditing(false);
          }}
        />
      ) : (
        <WindowTitle
          disabled={disabled}
          onClick={() => {
            !disabled && setIsEditing(true);
            disabled && setWindowProperty(
              windowData,
              setWindowData,
              windowItem,
              "hidden",
              false
            );
          }}
        >
          {windowItem["windowTitle"] === "" ? "*Empty*" : windowItem["windowTitle"]}
        </WindowTitle>
      )}
    </li>
  );
}

const WindowTitle = styled.p`
  cursor: ${props => props.disabled ? "pointer" : "text"};
  margin: 0.35rem 0 !important;
  color: ${props => props.disabled ? "gray" : "black"};
  font-size: 0.75rem;
`;

const WindowInput = styled.input`
  width: 5.5rem;
  height: 0.75rem;
  margin-top: 0;
`;

export default WindowTitleText;
