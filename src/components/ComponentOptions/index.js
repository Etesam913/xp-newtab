import React, {useContext, useRef} from 'react'
import styled from 'styled-components'
import {AppContext} from "../../Contexts";
import {changeItemProperty, highlightText} from "../Window/helper";
import {convertJustifyContentToTextAlign, convertTextAlignToJustifyContent} from "../../functions/helpers";
import {FlexContainer} from "../../styles/Layout";
import BackButton from "../BackButton";


export function TextAlignOptions({windowItem, item, text}) {
    const {windowData, setWindowData} = useContext(AppContext)

    return (
        <div>
            <OptionTitle>{text ? "Text Align:" : "Align"} </OptionTitle>
            <select
                onChange={(e) =>
                    changeItemProperty(
                        windowItem,
                        windowData,
                        setWindowData,
                        item,
                        "justifyContent",
                        convertTextAlignToJustifyContent(e.target.value)
                    )
                }
                defaultValue={convertJustifyContentToTextAlign(item["justifyContent"])}>
                <option>left</option>
                <option>center</option>
                <option>right</option>
            </select>
        </div>

    );
}

const OptionTitle = styled.span`
  margin-right: 0.25rem;
  white-space: nowrap;

`;

export function LinkOptions({
                                isTextSelected,
                                setIsTextSelected,
                                selectionObj,
                                showLinkInput,
                                setShowLinkInput,
                                windowItem,
                                item,
                                componentRef
                            }) {
    const {windowData, setWindowData} = useContext(AppContext)
    const linkInput = useRef(null)

    function convertSelectionToLink() {
        if (linkInput.current.value.trim() !== "") {
            const selectionElem = document.getElementsByClassName("selected")[0];
            const parent = selectionElem.parentElement;
            const childToReplaceWith = document.createElement('a');
            childToReplaceWith.href = linkInput.current.value;
            childToReplaceWith.innerText = selectionElem.innerText;
            parent.replaceChild(childToReplaceWith, selectionElem);
            changeItemProperty(
                windowItem,
                windowData,
                setWindowData,
                item,
                "html",
                componentRef.current.innerHTML
            )
        }
    }

    function handleEnter(e) {
        if (e.keyCode === 13) {
            setShowLinkInput(false);
            setIsTextSelected(false);
            convertSelectionToLink();
        }
    }

    function renderOption() {
        if (isTextSelected && !showLinkInput) {
            return (
                <button onClick={() => {
                    setShowLinkInput(true);
                    highlightText(selectionObj)
                }}>
                    Create Link
                </button>
            )
        } else if (isTextSelected && showLinkInput) {
            return (
                <FlexContainer width={"100%"}>
                    <BackButton
                        onClick={() => {
                            setShowLinkInput(false);
                        }}
                        margin={"0 0.25rem 0 0"}/>
                    <LinkInput ref={linkInput} placeholder="Paste website url here" onKeyDown={handleEnter}/>
                    <button onClick={() => {
                        setShowLinkInput(false);
                        setIsTextSelected(false);
                        convertSelectionToLink();
                    }}>Done
                    </button>
                </FlexContainer>
            );
        }
    }

    return (
        <FlexContainer width={"100%"}>
            {renderOption()}
        </FlexContainer>
    );
}

const LinkInput = styled.input`
  width: 100%;
  margin-right: 0.25rem;
`;