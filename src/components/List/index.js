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
    if (!isEditModeOn && child["html"].indexOf("true") === 21) {
      child["html"] = child["html"].replace("true", "false");
    }
    else if(isEditModeOn && child["html"].indexOf("false") === 21){
      child["html"] = child["html"].replace("false", "true");
    }
    return child["html"];
  }).join("");

  useEffect(() => {
    list.current.innerHTML = children;
    const listItems = list.current.children;
    if (listItems) {
      for (let i = 0; i < listItems.length; i++) {
        let currentListItem = listItems[i];
        if (!currentListItem.onblur) {
          currentListItem.onblur = function(e) {
            const tempChildren = [...item["children"]];
            console.log(e.target.innerText);
            tempChildren[i]["html"] = `<li contenteditable="true" class="list-item">${e.target.innerText}</li>`;
            changeItemProperty(
              windowItem,
              windowData,
              setWindowData,
              item,
              "children",
              tempChildren
            );
          };
        }
      }
    }

  }, [windowData, list, isEditModeOn]);

  function handleBlur(event, id) {
    const tempChildren = [...item["children"]];
    const newIndex = tempChildren.length;
    tempChildren[newIndex] = event.target.value;
    changeItemProperty(
      windowItem,
      windowData,
      setWindowData,
      item,
      "children",
      tempChildren
    );
  }

  function handleClick() {
    const tempChildren = [...item["children"]];
    // TODO: Change this to get max id
    const newId = tempChildren[tempChildren.length - 1]["id"] + 1;
    tempChildren.push({
      id: newId,
      html: `<li contenteditable="true" class="list-item">${listInput.current.value}</li>`
    });

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
      <FlexContainer justifyContent="flex-start" margin="0.5rem">
        <ListInput ref={listInput} placeholder="List Item Text Goes Here" />
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
  margin: 0 0 0 0.5rem;
`;

export default List;