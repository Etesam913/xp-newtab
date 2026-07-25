import React from "react";
import styled from "styled-components";

import { changeItemProperty } from "../Window/helper";
import {
  convertJustifyContentToTextAlign,
  convertTextAlignToJustifyContent,
} from "../../functions/helpers";
import { useStore } from "../../Store";
import { useTranslation } from "react-i18next";

export function TextAlignOptions({ windowObj, windowItem, text }) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const { t } = useTranslation();

  return (
    <div>
      <OptionTitle>{text ? t("textAlign") : t("align")}</OptionTitle>
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
        <option value="left">{t("left")}</option>
        <option value="center">{t("center")}</option>
        <option value="right">{t("right")}</option>
      </select>
    </div>
  );
}

const OptionTitle = styled.span`
  margin-right: 0.25rem;
  white-space: nowrap;
`;
