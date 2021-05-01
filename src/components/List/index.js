import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../Contexts";
import { changeItemProperty, handleDelete } from "../Window/helper";
import { FlexContainer } from "../../styles/Layout";
import { getMaxId } from "../../functions/helpers";

function List({ windowItem, windowObj }) {
  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);
  const list = useRef(null);
  const listInput = useRef(null);
  const children = windowItem["children"].map((child, index) => {
    // is content editable true
    console.log("show", child["html"].indexOf("show"))
    console.log("hide", child["html"].indexOf("hide"))
    if (!isEditModeOn && child["html"].indexOf("true") === 21 && child["html"].indexOf("show") !== -1) {
      child["html"] = child["html"].replace("true", "false");
      child["html"] = child["html"].replace("show", "hide");
    } else if (isEditModeOn && child["html"].indexOf("false") === 21 && child["html"].indexOf("hide") !== -1) {
      child["html"] = child["html"].replace("false", "true");
      child["html"] = child["html"].replace("hide", "show");
    }
    return child["html"];
  }).join("");

  useEffect(() => {
    list.current.innerHTML = children;
    const listItems = list.current.getElementsByTagName("li");
    if (listItems) {
      for (let i = 0; i < listItems.length; i++) {
        let currentListItem = listItems[i];
        if (!currentListItem.onblur) {
          currentListItem.onblur = function(e) {
            const tempChildren = [...windowItem["children"]];
            console.log(e.target.innerText);
            tempChildren[i]["html"] = `<li contenteditable="true" class="list-item">${e.target.innerText}</li><button class="show list-delete-button">Delete</button>`;
            changeItemProperty(
              windowObj,
              windowData,
              setWindowData,
              windowItem,
              "children",
              tempChildren
            );
          };
        }
      }
    }

    const listButtons = list.current.getElementsByTagName("button")
    if(listButtons){
      for(let i = 0; i < listButtons.length; i++){
        let currentButton = listButtons[i]
        currentButton.onclick = function(e){
          let tempChildren = [...windowItem["children"]];
          console.log(i)
          tempChildren.splice(0, 1);
          console.log(tempChildren)
          changeItemProperty(
            windowObj,
            windowData,
            setWindowData,
            windowItem,
            "children",
            tempChildren
          );
        }
      }
    }

  }, [windowData, list, isEditModeOn]);

  function handleClick() {
    const tempChildren = [...windowItem["children"]];
    // TODO: Change this to get max id
    let newId = 0;
    if(tempChildren.length > 0)
      newId = getMaxId(windowItem) + 1;

    tempChildren.push({
      id: newId,
      html: `<li contenteditable="true" class="list-item">${listInput.current.value}</li><button class="show list-delete-button">Delete</button>`
    });

    changeItemProperty(
      windowObj,
      windowData,
      setWindowData,
      windowItem,
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
      <section>
        <FlexContainer justifyContent="flex-start" margin="0.5rem">
          <ListInput ref={listInput} placeholder="List Item Text Goes Here" />
          <ListButton onClick={handleClick}>Add Item</ListButton>
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="center">
          <button
            onClick={() => {
              handleDelete(windowData, setWindowData, windowObj, windowItem["id"]);
            }}
          >
            Delete List
          </button>
        </FlexContainer>
      </section>
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