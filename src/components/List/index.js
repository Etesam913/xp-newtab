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
            const strikethroughClass = currentListItem
              .classList.contains("strikethrough") ? "strikethrough" : ""
            const strikethroughButtonText =
              currentListItem
                .classList.contains("strikethrough") ? "Remove Strikethrough" : "Strikethrough";

            tempChildren[i]["html"] =
              `<li contenteditable="true" class="list-item ${strikethroughClass}">${e.target.innerText}</li>
                <div class="list-item-options show">
                  <button class="list-delete-button">Delete</button>
                  <button class="list-strikethrough-button">${strikethroughButtonText}</button>
                </div>`;
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

    const deleteButtons = list.current.getElementsByClassName("list-delete-button");
    if (deleteButtons) {
      for (let i = 0; i < deleteButtons.length; i++) {
        let currentButton = deleteButtons[i];
        currentButton.onclick = function() {
          let tempChildren = [...windowItem["children"]];
          tempChildren.splice(i, 1);
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

    const strikethroughButtons = list.current.getElementsByClassName("list-strikethrough-button");
    if (strikethroughButtons) {
      for (let i = 0; i < strikethroughButtons.length; i++) {
        let currentButton = strikethroughButtons[i];
        currentButton.onclick = function() {
          const tempChildren = [...windowItem["children"]];
          const listItem = listItems[i];
          /*tempChildren[i]["html"] = {*/
          if (listItem.classList.contains("strikethrough")) {
            tempChildren[i]["html"] =
              `<li contenteditable="true" class="list-item">${listItem.innerText}</li>
                <div class="list-item-options show">
                  <button class="list-delete-button">Delete</button>
                  <button class="list-strikethrough-button">Strikethrough</button>
                </div>`;
          } else {
            tempChildren[i]["html"] =
              `<li contenteditable="true" class="list-item strikethrough">${listItem.innerText}</li>
                <div class="list-item-options show">
                  <button class="list-delete-button">Delete</button>
                  <button class="list-strikethrough-button">Remove Strikethrough</button>
                </div>`;
          }

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
  }, [windowData, list, isEditModeOn]);

  function handleClick() {
    const tempChildren = [...windowItem["children"]];
    // TODO: Change this to get max id
    let newId = 0;
    if (tempChildren.length > 0)
      newId = getMaxId(windowItem) + 1;

    tempChildren.push({
      id: newId,
      html:
        `<li contenteditable="true" class="list-item">${listInput.current.value}</li>
        <div class="list-item-options show">
          <button class="list-delete-button">Delete</button>
          <button class="list-strikethrough-button">Strikethrough</button>
        </div>`
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