import React, {useContext, useState, useRef} from 'react'
import {Header1} from "../../styles/Headers";
import {convertJustifyContentToTextAlign, getSelectionText} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {FlexContainer} from "../../styles/Layout";
import {TextAlignOptions, LinkOptions} from "../ComponentOptions";
import {changeItemProperty} from "../Window/helper";


function Header({windowItem, item}) {
    const {windowData, setWindowData, isMenuShowing} = useContext(AppContext);
    const [isTextSelected, setIsTextSelected] = useState(false);
    const header = useRef(null);

    function createLink(e) {
        if (getSelectionText() !== "") {
            const selection = window.getSelection();
            const htmlToInsert = '<span class="selected">' + selection + '</span>';
            const text = header.current.innerHTML;
            console.log(text)
            const range = selection.getRangeAt(0);
            const parentTag = range.commonAncestorContainer.parentElement.tagName
            console.log(parentTag)
            // Selection styling should only occur when the selection is not already in an a tag.
            // Should not be able to double select (selecting inside selected text)
            if (parentTag !== "A" && parentTag !== "SPAN") {
                header.current.innerHTML = text.replace(selection, htmlToInsert);
                setIsTextSelected(true)
            }
            // We do not want to set it to false when double selecting. just want to do nothing in that case
            else if (parentTag === "A") {
                setIsTextSelected(false)
            }
        } else {
            setIsTextSelected(false);
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
                parent.replaceChild(document.createTextNode(child.textContent), child)
            }

            /*for (let i = 0; i < paragraphChildren.length; i++) {
                if (paragraphChildren[i].classList && paragraphChildren[i].classList.contains("selected")) {
                    const text = paragraphChildren[i].textContent;
                    paragraphText.replaceChild(document.createTextNode(text), paragraphChildren[i])
                }
            }*/
        }
    }

    function handleOptions() {
        if (isMenuShowing) {
            if (isTextSelected)
                return <LinkOptions setIsTextSelected={setIsTextSelected} header={header}/>
            else
                return <TextAlignOptions item={item} windowItem={windowItem}/>
        }
    }

    return (
        <div>
            <FlexContainer margin={isMenuShowing ? '0 0 .5rem 0' : '0'}>
                {handleOptions()}
            </FlexContainer>
            <Header1
                ref={header}
                tabIndex={0}
                key={"header-" + windowItem["id"] + "-" + item["id"]}
                as={'h1'}
                contentEditable={isMenuShowing ? 'true' : 'false'}
                width={'100%'}
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
            ><p>{item["text"]}</p></Header1>
        </div>
    )
}

export default Header