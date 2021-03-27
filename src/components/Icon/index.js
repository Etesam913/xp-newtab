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
      <IconWrapper ref={iconRef}>test</IconWrapper>
    </Draggable>

  );
}

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 1rem;
  top: 1rem;
`;

export default Index;