import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../Contexts";
import { changeItemProperty } from "../Window/helper";
import { FlexContainer } from "../../styles/Layout";

function List({ item, windowItem }) {
  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);
  const list = useRef(null);
  const listInput = useRef(null);
  const children = item["children"].map((child, index) => {
    // is content editable true
    if(!isEditModeOn && child.indexOf("true") === 21){
      child = child.replace("true", "false");
    }
    return child;
  }).join("");

  useEffect(() => {
    list.current.innerHTML = children;
  }, [windowData, list, isEditModeOn]);

  function handleClick() {
    const tempChildren = [...item["children"]];
    tempChildren.push(`<li contenteditable="true" class="list-item">${listInput.current.value}</li>`);
    changeItemProperty(
      windowItem,
      windowData,
      setWindowData,
      item,
      "children",
      tempChildren
    );
    listInput.current.value = "";
  }

  return (
    <div>
      <StyledList ref={list}>
      </StyledList>
      {isEditModeOn &&
      <FlexContainer justifyContent="flex-start" margin="0.5rem 0.5rem 0.5rem 1rem">
        <ListInput ref={listInput} placeholder="List Item Text Goes Here"/>
        <ListButton onClick={handleClick}>Add Item</ListButton>
      </FlexContainer>

      }
    </div>

  );
}

const StyledList = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  padding-left: 0.5rem;
`;

const ListInput = styled.input`
  width: 100%;
`;

const ListButton = styled.button`
  margin: 0 0.5rem; 
`

export default List;