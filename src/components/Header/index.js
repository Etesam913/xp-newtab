import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Header1 } from "../../styles/Headers";
import { convertJustifyContentToTextAlign } from "../../functions/helpers";
import { AppContext } from "../../Contexts";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions } from "../ComponentOptions";
import { changeItemProperty, handleDelete } from "../Window/helper";
import { DeleteButton } from "../../styles/StyledComponents";


function Header({ windowObj, windowItem }) {
  const { windowData, setWindowData, isEditModeOn } = useContext(AppContext);
  const header = useRef(null);
  useEffect(() => {
    header.current.innerHTML = windowItem["html"];
  }, [header, windowItem]);

  return (
    <div>
      <FlexContainer margin={isEditModeOn ? "0 0 .5rem 0" : "0"}>
        {isEditModeOn && <TextAlignOptions windowObj={windowObj} windowItem={windowItem} text />}
      </FlexContainer>
      <FlexContainer>
        <HeaderComponent
          isEditModeOn={isEditModeOn}
          ref={header}
          tabIndex={0}
          key={"header-" + windowObj["id"] + "-" + windowItem["id"]}
          as={Header1}
          contentEditable={isEditModeOn ? "true" : "false"}
          width={"100%"}
          background={isEditModeOn ? "white" : "transparent"}
          border={isEditModeOn ? "1px solid #cccccc" : "0px"}
          onBlur={() => {
            changeItemProperty(
              windowObj,
              windowData,
              setWindowData,
              windowItem,
              "html",
              header.current.innerHTML
            );
          }}
          textAlign={convertJustifyContentToTextAlign(windowItem["justifyContent"])}
          margin={"0"}
          suppressContentEditableWarning={true}
        >
        </HeaderComponent>
        {isEditModeOn &&
        <DeleteButton
          onClick={() => {
            handleDelete(windowData, setWindowData, windowObj, windowItem["id"]);
          }}>
          Delete
        </DeleteButton>}
      </FlexContainer>
    </div>
  );
}

const HeaderComponent = styled.input`
  :hover {
    outline: ${props => !props.isEditModeOn && "0px"};
  }

  p::selection {
    background-color: #2267cb;
    color: white;
  }

  margin-right: 0.4rem;
  word-wrap: break-word;
  width: ${props => props.isEditModeOn ? "81.8%" : "100%"};
  -webkit-user-select: text;
  user-select: text;
`;

export default Header;
