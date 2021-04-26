import React, { useContext, useRef } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { setWindowProperty } from "../Window/helper";
import { AppContext } from "../../Contexts";

function Index({ iconItem }) {
  const { iconData, setIconData } = useContext(AppContext);
  const iconRef = useRef(null);

  return (
    <Draggable
      bounds="#wrapper"
      nodeRef={iconRef}
      defaultPosition={{ x: iconItem["xCoord"], y: iconItem["yCoord"] }}
      onStop={() => {
        setWindowProperty(
          iconData,
          setIconData,
          iconItem,
          "position",
          iconRef
        );
      }}
    >
      {/* TODO: Change cursor to loading cursor for 0.5 seconds */}
      <IconWrapper tabIndex={0} ref={iconRef} onDoubleClick={() => window.location = iconItem["redirect"]}>
        <IconImg src={iconItem["src"]} />
        <IconText> {iconItem["title"]} </IconText>
      </IconWrapper>

    </Draggable>

  );
}

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 1rem;
  top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  :focus {
    outline: 1px dotted black;
  }
`;

const IconImg = styled.img`
  height: 48px;
  width: 48px;
  pointer-events: none;
`;

const IconText = styled.p`
  font-family: 'Pixelated MS Sans Serif';
  margin-top: 0.35rem;
  color: white;
  text-shadow: 1.25px 1.2px 1px #000000;
`;

export default Index;