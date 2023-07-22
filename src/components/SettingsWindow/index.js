import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppearanceTab, InfoTab, MiscTab } from "./Tabs";
import { useStore } from "../../Store";
import { TitleBarButton } from "../WindowTitleBar";

function SettingsWindow({ settingsData }) {
  const setIsSettingsShowing = useStore((state) => state.setIsSettingsShowing);
  const [currentTab, setCurrentTab] = useState("Appearance");
  const imageInput = useRef(null);
  const colorInput = useRef(null);

  useEffect(() => {
    if (imageInput.current && colorInput.current) {
      imageInput.current.value = settingsData["backgroundImage"];
      colorInput.current.value = settingsData["backgroundColor"];
    }
  }, [imageInput, colorInput, settingsData]);

  const tabData = ["Appearance", "Miscellaneous", "Information"];
  const tabs = tabData.map((tab, index) => {
    return (
      <button
        key={`tab-${index}`}
        role="tab"
        data-cy={`setting-tab-${index}`}
        aria-selected={currentTab === tab}
        onClick={() => {
          setCurrentTab(tab);
        }}
        aria-controls={tab}
      >
        {tab}
      </button>
    );
  });

  return (
    <>
      <Window className="window active">
        <div className="title-bar">
          <div className="title-bar-text"> Settings</div>
          <div className="title-bar-controls">
            <TitleBarButton
              windowsOS={settingsData["windowsOS"]}
              aria-label="Close"
              onClick={() => {
                setIsSettingsShowing(false);
              }}
            />
          </div>
        </div>
        <section className="window-body tabs">
          <menu
            role="tablist"
            aria-label="Settings Tabs"
            style={{ padding: "0 0 0 3px" }}
          >
            {tabs}
          </menu>

          {currentTab === "Appearance" && (
            <AppearanceTab imageInput={imageInput} colorInput={colorInput} />
          )}

          {currentTab === "Information" && <InfoTab />}
          {currentTab === "Miscellaneous" && <MiscTab />}
        </section>
      </Window>
      <GrayShade
        onClick={() => {
          setIsSettingsShowing(false);
        }}
      />
    </>
  );
}

const Window = styled.div`
  width: 37rem;
  height: auto;
  position: absolute !important ;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ${(props) => props.theme.fonts.primary};
  z-index: 6 !important;
  @media only screen and (max-width: 768px) {
    width: 80% !important;
  }
`;
const GrayShade = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export default SettingsWindow;
