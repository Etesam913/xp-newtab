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

    // TODO: Pressing Enter in a header should make a new header with the content to the right of the cursor.
    function createLink(e) {
        // Can only select if nothing is currently selected.
        if (getSelectionText() !== "" && document.getElementsByClassName("selected").length === 0) {
            const selection = window.getSelection();
            const htmlToInsert = '<span class="selected">' + selection + '</span>';
            const text = header.current.innerHTML;

            const range = selection.getRangeAt(0);
            const parentTag = range.commonAncestorContainer.parentElement.tagName
            // Selection styling should only occur when the selection is not already in an a tag.
            if (parentTag !== "A") {
                //header.current.innerHTML = text.replace(selection, htmlToInsert);
                setIsTextSelected(true)
                setSelectionObj(selection)
            } else {
                setIsTextSelected(false)
                setShowLinkInput(false)
            }
            // WHen you click without selecting anything
        } else {
            setIsTextSelected(false);
            setShowLinkInput(false)
            // Removes the selection class
            const paragraphText = header.current.firstChild;

            const paragraphChildren = document.getElementsByClassName("selected")
            let changesArr = []
            const paragraphChildrenLength = paragraphChildren.length
            for (let i = 0; i < paragraphChildrenLength; i++) {
                console.log(i)
                const parent = paragraphChildren[i].parentElement;
                const text = paragraphChildren[i].textContent;
                changesArr.push([parent, paragraphChildren[i]])
                /*parent.replaceChild(document.createTextNode(text), paragraphChildren[i])*/
            }
            for (let i = 0; i < changesArr.length; i++) {
                const parent = changesArr[i][0]
                const child = changesArr[i][1]
                parent.replaceChild(document.createTextNode(child.textContent), child);
            }

            /*for (let i = 0; i < paragraphChildren.length; i++) {
                if (paragraphChildren[i].classList && paragraphChildren[i].classList.contains("selected")) {
                    const text = paragraphChildren[i].textContent;
                    paragraphText.replaceChild(document.createTextNode(text), paragraphChildren[i])
                }
            }*/
        }
    }

    function replaceSelectionWithNode(node) {
        let range, html;
        if (window.getSelection && window.getSelection().getRangeAt) {
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(node);
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            html = (node.nodeType === 3) ? node.data : node.outerHTML;
            range.pasteHTML(html);
        }
    }

    function highlightText(selection){
        if(selection){
            let elem = document.createElement("span");
            elem.className = "selected";
            elem.appendChild(document.createTextNode(selection))

            /*const htmlToInsert = '<span class="selected">' + selection + '</span>';
            const text = header.current.innerHTML;*/
            const range = selection.getRangeAt(0);
            const parent = range.commonAncestorContainer;
            const grandParent = parent.parentElement;
            if(grandParent.tagName !== "A"){
                replaceSelectionWithNode(elem)
                /*header.current.innerHTML = text.replace(selection, htmlToInsert);*/
            }
        }
    }

    function handleOptions() {
        if (isMenuShowing) {
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
                return(
                    <FlexContainer width={"100%"}>
                        <LinkInput placeholder="Paste website url here" />
                        <button> Done</button>
                    </FlexContainer>
                );

            }

            /*<LinkOptions setIsTextSelected={setIsTextSelected} header={header}/>*/
            else
                return <TextAlignOptions item={item} windowItem={windowItem}/>
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
            /*const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const parent = range.commonAncestorContainer.parentElement
            if (parent.tagName !== 'A') {
                const caretPos = getCaretPosition(parent, range.commonAncestorContainer, range.endOffset);
                const textToRightOfCaret = parent.textContent.substring(caretPos, parent.textContent.length);
                const textToLeftOfCaret = parent.textContent.substring(0, caretPos);
                console.log(textToLeftOfCaret)
                console.log(textToRightOfCaret)
            }*/

            /*console.log(range.endOffset,)*/
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

const LinkInput = styled.input`
  margin-right: 0.25rem;
  width: 100%;
`


export default Header