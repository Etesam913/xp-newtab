import React, {useContext, useState, useRef} from 'react'
import styled from 'styled-components';
import {Header1} from "../../styles/Headers";
import {convertJustifyContentToTextAlign, getSelectionText} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions, LinkOptions} from "../ComponentOptions";
import {changeItemProperty} from "../Window/helper";


function Header({windowItem, item}) {
    const {windowData, setWindowData, isMenuShowing} = useContext(AppContext);
    const [isTextSelected, setIsTextSelected] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [selectionObj, setSelectionObj] = useState(null);
    const header = useRef(null);

    function createLink(e) {
        // Can only select if nothing is currently selected.
        if (getSelectionText() !== "" && document.getElementsByClassName("selected").length === 0) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const parentTag = range.commonAncestorContainer.parentElement.tagName

            // Selection styling should only occur when the selection is not already in an a tag.
            if (parentTag !== "A") {
                setIsTextSelected(true)
                setSelectionObj(selection)
            } else {
                setIsTextSelected(false)
                setShowLinkInput(false)
            }
        } else {
            setIsTextSelected(false);
            setShowLinkInput(false);
            // Removes the selection class if it exists
            const selectedElem = document.getElementsByClassName("selected")[0]
            if (selectedElem) {
                const itemToReplaceWith = document.createTextNode(selectedElem.textContent);
                const parent = selectedElem.parentNode;
                parent.replaceChild(itemToReplaceWith, selectedElem);
            }
        }
    }


    function handleOptions() {
        if (isMenuShowing) {
            if (isTextSelected) {
                return (
                    <LinkOptions
                        isTextSelected={isTextSelected}
                        setIsTextSelected={setIsTextSelected}
                        selectionObj={selectionObj}
                        header={header}
                        showLinkInput={showLinkInput}
                        setShowLinkInput={setShowLinkInput}
                    />)
            } else {
                return <TextAlignOptions item={item} windowItem={windowItem}/>
            }
        }
    }

    function getCaretPosition(parent, cursorNode, relativeCurPosition) {
        const children = parent.childNodes;
        let currentLength = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i] === cursorNode) {
                return currentLength + relativeCurPosition
            }
            currentLength += children[i].textContent.length;
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        } else {
            setIsTextSelected(false)
        }
    }

    return (
        <div>
            <FlexContainer margin={isMenuShowing ? '0 0 .5rem 0' : '0'}>
                {handleOptions()}
            </FlexContainer>
            <HeaderComponent
                isMenuShowing={isMenuShowing}
                ref={header}
                tabIndex={0}
                onKeyDown={(e) => {
                    handleKeyDown(e)
                }}
                key={"header-" + windowItem["id"] + "-" + item["id"]}
                as={Header1}
                contentEditable={isMenuShowing ? 'true' : 'false'}
                width={'100%'}
                background={isMenuShowing ? 'white' : 'transparent'}
                border={isMenuShowing ? '1px solid #cccccc' : "0px"}
                onClick={(e) => {
                    createLink(e)
                }}
                onBlur={() => {
                    changeItemProperty(
                        windowItem,
                        windowData,
                        setWindowData,
                        item,
                        "text",
                        header.current.innerText
                    )
                }}
                textAlign={convertJustifyContentToTextAlign(item["justifyContent"])}
                margin={'0'}
                suppressContentEditableWarning={true}
            >
                <p>{item["text"]}</p>
            </HeaderComponent>
        </div>
    )
}

const HeaderComponent = styled.input`
  :hover {
    outline: ${props => !props.isMenuShowing && '0px'};
  }

  p::selection {
    background-color: #2267cb;
    color: white;
  }
`;

export default Header