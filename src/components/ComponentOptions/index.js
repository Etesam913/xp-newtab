import React, {useContext, useRef} from 'react'
import styled from 'styled-components'
import {AppContext} from "../../Contexts";
import {changeItemProperty} from "../Window/helper";
import {convertJustifyContentToTextAlign, convertTextAlignToJustifyContent} from "../../functions/helpers";
import {FlexContainer} from "../../styles/Layout";


export function TextAlignOptions({windowItem, item}) {
    const {windowData, setWindowData} = useContext(AppContext)

    return (
        <div>
            <OptionTitle>Text Align: </OptionTitle>
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

export function LinkOptions({setIsTextSelected, header}) {
    const linkInput = useRef(null)

    function handleClick() {
        // TODO: Fix problem where selecting one characters that is present twice or more selects the first occurrence always
        if (linkInput.current.value !== "") {
            setIsTextSelected(false);
            const paragraphText = header.current.firstChild;
            const paragraphChildren = paragraphText.childNodes;
            for (let i = 0; i < paragraphChildren.length; i++) {
                if (paragraphChildren[i].classList && paragraphChildren[i].classList.contains("selected")) {
                    const elementToReplace = document.createElement("a");
                    elementToReplace.href = linkInput.current.value;
                    elementToReplace.innerText = paragraphChildren[i].innerText;
                    paragraphText.replaceChild(elementToReplace, paragraphChildren[i])
                }
            }
        }

    }

    return (
        <FlexContainer width={"100%"}>
            <LinkInput
                ref={linkInput}
                placeholder={"Paste url to website here"}
                id={"linkInput"}
            />
            <LinkButton onClick={handleClick}>Create Link</LinkButton>
        </FlexContainer>
    );
}

const LinkInput = styled.input`
  width: 100%;
`;

const LinkButton = styled.button`
  width: 110px;
  margin-left: 0.35rem;
`
