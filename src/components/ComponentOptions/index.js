import React, {useContext} from 'react'
import styled from 'styled-components'
import {AppContext} from "../../Contexts";
import {changeItemProperty} from "../Window/helper";
import {convertJustifyContentToTextAlign} from "../../functions/helpers";


export function TextAlignOptions({windowItem, item}) {
    const {windowData, setWindowData} = useContext(AppContext)

    return (
        <div>
            <OptionHeader>Text Align</OptionHeader>
            <select defaultValue={convertJustifyContentToTextAlign(item["justifyContent"])}>
                <option

                    onClick={(e) => {
                        changeItemProperty(
                            windowItem,
                            windowData,
                            setWindowData,
                            item,
                            "justifyContent",
                            "flex-start"
                        )
                    }}>
                    left
                </option>
                <option
                    onClick={(e) => {
                        changeItemProperty(
                            windowItem,
                            windowData,
                            setWindowData,
                            item,
                            "justifyContent",
                            "center"
                        )
                    }}>
                    center
                </option>
                <option
                    onClick={(e) => {
                        changeItemProperty(
                            windowItem,
                            windowData,
                            setWindowData,
                            item,
                            "justifyContent",
                            "flex-end"
                        )
                    }}>
                    right
                </option>
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
