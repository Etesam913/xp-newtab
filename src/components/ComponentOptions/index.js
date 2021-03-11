import React, {useContext} from 'react'
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

export function LinkOptions({setIsTextSelected}){
    return(
        <FlexContainer width={"100%"}>
            <OptionTitle as={"label"} htmlFor={"linkInput"}>Create Link:</OptionTitle>
            <LinkInput id={"linkInput"} onFocus={()=>{setIsTextSelected(true)}} placeholder={"Paste url to website here"}/>
        </FlexContainer>
    );
}

const LinkInput = styled.input`
  width: 100%;
`;
