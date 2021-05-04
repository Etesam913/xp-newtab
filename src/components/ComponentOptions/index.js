import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../Contexts";
import { changeItemProperty, highlightText } from "../Window/helper";
import { convertJustifyContentToTextAlign, convertTextAlignToJustifyContent } from "../../functions/helpers";
import { FlexContainer } from "../../styles/Layout";
import BackButton from "../BackButton/index";


export function TextAlignOptions({ windowObj, windowItem, text }) {
  const { windowData, setWindowData } = useContext(AppContext);

  return (
    <div>
      <OptionTitle>{text ? "Text Align:" : "Align"} </OptionTitle>
      <select
        onChange={(e) =>
          changeItemProperty(
            windowObj,
            windowData,
            setWindowData,
            windowItem,
            "justifyContent",
            convertTextAlignToJustifyContent(e.target.value)
          )
        }
        defaultValue={convertJustifyContentToTextAlign(windowItem["justifyContent"])}>
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
