import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header1 } from "../../styles/Headers";
import { convertJustifyContentToTextAlign, getSelectionText } from "../../functions/helpers";
import { AppContext } from "../../Contexts";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions, LinkOptions } from "../ComponentOptions";
import { changeItemProperty, handleDelete } from "../Window/helper";
import { DeleteButton } from "../../styles/StyledComponents";


function Header({ windowObj, windowItem }) {
  const { windowData, setWindowData, isEditModeOn } = useContext(AppContext);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [selectionObj, setSelectionObj] = useState(null);
  const header = useRef(null);

  useEffect(() => {
    header.current.innerHTML = windowItem["html"];
  }, [header, windowItem]);

  function createLink() {
    // Can only select if nothing is currently selected.
    if (getSelectionText() !== "" && document.getElementsByClassName("selected").length === 0) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const parentTag = range.commonAncestorContainer.parentElement.tagName;

      // Selection styling should only occur when the selection is not already in an a tag.
      if (parentTag !== "A") {
        setIsTextSelected(true);
        setSelectionObj(selection);
      } else {
        setIsTextSelected(false);
        setShowLinkInput(false);
      }
    } else {
      setIsTextSelected(false);
      setShowLinkInput(false);
      // Removes the selection class if it exists
      const selectedElem = document.getElementsByClassName("selected")[0];
      if (selectedElem) {
        const itemToReplaceWith = document.createTextNode(selectedElem.textContent);
        const parent = selectedElem.parentNode;
        parent.replaceChild(itemToReplaceWith, selectedElem);
      }
    }
  }


  function handleOptions() {
    if (isEditModeOn) {
      if (isTextSelected) {
        return (
          <LinkOptions
            isTextSelected={isTextSelected}
            setIsTextSelected={setIsTextSelected}
            selectionObj={selectionObj}
            componentRef={header}
            showLinkInput={showLinkInput}
            setShowLinkInput={setShowLinkInput}
            windowObj={windowObj}
            windowItem={windowItem}
          />);
      } else {
        return <TextAlignOptions text windowItem={windowItem} windowObj={windowObj} />;
      }
    }
  }

  /*
    function getCaretPosition(parent, cursorNode, relativeCurPosition) {
      const children = parent.childNodes;
      let currentLength = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i] === cursorNode) {
          return currentLength + relativeCurPosition;
        }
        currentLength += children[i].textContent.length;
      }
    }
  */

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    } else {
      setIsTextSelected(false);
    }
  }

  return (
    <div>
      <FlexContainer margin={isEditModeOn ? "0 0 .5rem 0" : "0"}>
        {handleOptions()}
      </FlexContainer>
      <FlexContainer justifyContent="flex-start">
        <HeaderComponent
          isEditModeOn={isEditModeOn}
          ref={header}
          tabIndex={0}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          key={"header-" + windowObj["id"] + "-" + windowItem["id"]}
          as={Header1}
          contentEditable={isEditModeOn ? "true" : "false"}
          width={"100%"}
          background={isEditModeOn ? "white" : "transparent"}
          onClick={(e) => {
            createLink(e);
          }}
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
  cursor: ${props => props.isEditModeOn ? "text" : props.theme.cursors.auto};
`;

export default Header;