import React, { useEffect, useState } from "react";
import { Header1 } from "../../styles/Headers";
import { FlexContainer } from "../../styles/Layout";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import { updateSetting } from "../../functions/helpers";
import { useStore } from "../../Store";

export function ColorAndImageTab({ imageInput, colorInput }) {
  const settingsData = useStore((state) => state.settingsData);
  const setSettingsData = useStore((state) => state.setSettingsData);

  const [color, setColor] = useState(settingsData["backgroundColor"]);

  function handleColorInputEnter(e) {
    if (e.keyCode === 13) {
      updateSetting(
        settingsData,
        setSettingsData,
        "backgroundColor",
        e.target.value
      );
    }
  }

  function handleImageInputEnter(e) {
    if (e.keyCode === 13) {
      updateSetting(
        settingsData,
        setSettingsData,
        "backgroundImage",
        e.target.value
      );
    }
  }

  function handleKeyDown(e) {
    // Do not allow open and closed parenthesis
    if (e.which === 40 || e.which === 41) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    updateSetting(settingsData, setSettingsData, "backgroundColor", color);
  }, [color]);

  return (
    <article role="tabpanel">
      <Header1 margin={"1rem 0 1rem"}>Change Background Image</Header1>
      <FlexContainer
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        tablet
      >
        <TabInput
          ref={imageInput}
          defaultValue={settingsData["backgroundImage"]}
          placeholder={"Enter Image Url"}
          width={"70%"}
          onKeyDown={(e) => {
            handleImageInputEnter(e);
          }}
        />
        <FlexContainer flexDirection="column" alignItems={"flex-start"}>
          <button
            onClick={() => {
              updateSetting(
                settingsData,
                setSettingsData,
                "backgroundImage",
                imageInput.current.value
              );
            }}
          >
            Set Image
          </button>
          <RemoveButton
            onClick={() => {
              updateSetting(
                settingsData,
                setSettingsData,
                "backgroundImage",
                ""
              );
            }}
          >
            Remove Image
          </RemoveButton>
        </FlexContainer>
      </FlexContainer>

      <Header1 margin={"1.5rem 0 1rem"}>Change Background Color</Header1>
      <FlexContainer
        tablet
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <TabInput
          placeholder={"Enter Hex Color Code"}
          ref={colorInput}
          value={settingsData["backgroundColor"]}
          onKeyPress={(e) => {
            handleKeyDown(e);
          }}
          onChange={(e) => {
            setColor(e.target.value + "");
          }}
          onKeyDown={(e) => {
            handleColorInputEnter(e);
          }}
        />
        <HexColorPicker color={color} onChange={setColor} />
      </FlexContainer>
    </article>
  );
}

const TabInput = styled.input`
  margin-right: 1rem;
  width: ${(props) => props.width};
  @media only screen and (max-width: 768px) {
    margin-bottom: 1rem;
    width: 80%;
  }
`;
const RemoveButton = styled.button`
  margin-top: 0.5rem;
`;

export function InfoTab() {
  return (
    <article role="tabpanel">
      <Header1 margin={"0 0 1rem"}>Windows XP New Tab</Header1>
      <InfoParagraph>
        This extension was created by Etesam Ansari using React.js, Styled
        Components, and the XP.css GitHub repo.
      </InfoParagraph>
      <InfoGrid>
        <p style={{ marginRight: "0.5rem" }}>GitHub Link: </p>
        <a href={"https://github.com/Etesam913/xp-newtab"}>
          https://github.com/Etesam913/xp-newtab
        </a>

        <p style={{ marginRight: "0.5rem" }}>Firefox Addon Link: </p>
        <a href={"https://github.com/Etesam913/windowsxp-newtab"}>
          https://github.com/Etesam913/xp-newtab
        </a>

        <p style={{ marginRight: "0.5rem" }}>Chrome Addon Link: </p>
        <a href={"https://github.com/Etesam913/windowsxp-newtab"}>
          https://github.com/Etesam913/xp-newtab
        </a>
      </InfoGrid>
    </article>
  );
}

const InfoGrid = styled.div`
  margin-top: 0.45rem;
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-auto-rows: auto auto auto;
  align-self: center;
  row-gap: 0.75rem;
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const InfoParagraph = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1em;
`;

// Allows user to set settings such as grid, icon size
export function MiscTab() {
  const settingsData = useStore((state) => state.settingsData);
  const setSettingsData = useStore((state) => state.setSettingsData);

  return (
    <article role="tabpanel">
      <Header1>Change Dragging Grid</Header1>
      <select
        onChange={(e) => {
          updateSetting(
            settingsData,
            setSettingsData,
            "draggingGrid",
            e.target.value
          );
        }}
        defaultValue={settingsData["draggingGrid"]}
      >
        <option>0px</option>
        <option>15px</option>
        <option>30px</option>
        <option>45px</option>
      </select>
    </article>
  );
}
