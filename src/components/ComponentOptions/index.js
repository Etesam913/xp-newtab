import React from "react";
import styled from "styled-components";

import { changeItemProperty } from "../Window/helper";
import {
  convertJustifyContentToTextAlign,
  convertTextAlignToJustifyContent,
} from "../../functions/helpers";
import { useStore } from "../../Store";

export function TextAlignOptions({ windowObj, windowItem, text }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  return (
    <div>
      <OptionTitle>{text ? "Text Align:" : "Align"} </OptionTitle>
      <select
        data-cy={`align-image-${windowItem["id"]}`}
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
        defaultValue={convertJustifyContentToTextAlign(
          windowItem["justifyContent"]
        )}
      >
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
