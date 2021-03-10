import React, {useContext} from 'react'
import styled from 'styled-components'
import {AppContext} from "../../Contexts";
import {changeItemProperty} from "../Window/helper";
import {convertJustifyContentToTextAlign, convertTextAlignToJustifyContent} from "../../functions/helpers";


export function TextAlignOptions({windowItem, item}) {
    const {windowData, setWindowData} = useContext(AppContext)

    return (
        <div>
            <OptionHeader>Text Align</OptionHeader>
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

const OptionHeader = styled.h2`
  font-weight: normal;
  font-size: 0.75rem;
  text-align: center;
  margin: 0 0 0.25rem;
`;
