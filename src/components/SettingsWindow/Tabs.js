import React, { useEffect, useState } from "react";
import { Header1 } from "../../styles/Headers";
import { FlexContainer } from "../../styles/Layout";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import { updateSetting } from "../../functions/helpers";
import { useStore } from "../../Store";

export function AppearanceTab({ imageInput, colorInput }) {
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

  const defaultBackgroundImages = [
    "https://etesam.nyc3.cdn.digitaloceanspaces.com/Windows-XP-Newtab/images/bliss.jpg",
    "https://etesam.nyc3.cdn.digitaloceanspaces.com/Windows-XP-Newtab/images/windows98-homepage.png",
    "https://etesam.nyc3.cdn.digitaloceanspaces.com/Windows-XP-Newtab/images/windows-7-homepage.jpg",
  ];
  function handleOSChange(e) {
    const newOS = e.target.value;
    let windowsOS = null;
    let stylesheet = "";

    if (newOS === "Windows XP") {
      windowsOS = 0;
      stylesheet = "https://unpkg.com/xp.css";
    }
    if (newOS === "Windows 98") {
      windowsOS = 1;
      stylesheet = "https://unpkg.com/98.css";
    }
    if (newOS === "Windows 7") {
      windowsOS = 2;
      stylesheet = "https://unpkg.com/7.css";
    }

    const propertyNames = ["windowsOS", "stylesheet"];
    const propertyValues = [windowsOS, stylesheet];
    if (defaultBackgroundImages.includes(settingsData["backgroundImage"])) {
      propertyNames.push("backgroundImage");
      propertyValues.push(defaultBackgroundImages[windowsOS]);
      imageInput.current.value = defaultBackgroundImages[windowsOS];
    }
    updateSetting(settingsData, setSettingsData, propertyNames, propertyValues);
  }

  useEffect(() => {
    updateSetting(settingsData, setSettingsData, "backgroundColor", color);
  }, [color, setSettingsData]);

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
            data-cy="set-background-image-button"
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
          <MarginButton
            data-cy="reset-background-image-button"
            onClick={() => {
              updateSetting(
                settingsData,
                setSettingsData,
                "backgroundImage",
                defaultBackgroundImages[settingsData["windowsOS"]]
              );
              imageInput.current.value =
                defaultBackgroundImages[settingsData["windowsOS"]];
            }}
          >
            Reset to Default
          </MarginButton>
          <MarginButton
            data-cy="remove-background-image-button"
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
          </MarginButton>
        </FlexContainer>
      </FlexContainer>
      <Header1 margin={"1.5rem 0 1rem"}>Change Background Color</Header1>
      <FlexContainer
        tablet
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <TabInput
          data-cy="background-color-input"
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
      <Header1>Change Styles</Header1>
      <FlexContainer justifyContent="flex-start">
        <select onChange={handleOSChange}>
          <option selected={settingsData["windowsOS"] === 0}>Windows XP</option>
          <option selected={settingsData["windowsOS"] === 1}>Windows 98</option>
          <option selected={settingsData["windowsOS"] === 2}>Windows 7</option>
        </select>
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
const MarginButton = styled.button`
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
        <p style={{ marginRight: "0.5rem" }} data-cy="github-text">
          GitHub Link:{" "}
        </p>
        <a href={"https://github.com/Etesam913/xp-newtab"}>
          https://github.com/Etesam913/xp-newtab
        </a>

        <p style={{ marginRight: "0.5rem" }} data-cy="firefox-addon-text">
          Firefox Addon Link:{" "}
        </p>
        <a href={"https://addons.mozilla.org/en-US/firefox/addon/xp-newtab/"}>
          https://addons.mozilla.org/en-US/firefox/addon/xp-newtab/
        </a>

        <p style={{ marginRight: "0.5rem" }} data-cy="chrome-addon-text">
          Chrome Addon Link:{" "}
        </p>
        <a
          href={
            "https://chrome.google.com/webstore/detail/xp-newtab/ncfmlogaelpnniflgipmnnglhfiifkke"
          }
        >
          https://chrome.google.com/webstore/detail/xp-newtab/ncfmlogaelpnniflgipmnnglhfiifkke
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
        data-cy="dragging-grid"
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