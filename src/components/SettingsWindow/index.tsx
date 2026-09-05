import type { Settings } from "../../types";
import type { StyleProps } from "../../types";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppearanceTab, InfoTab, MiscTab } from "./Tabs";
import { useStore } from "../../Store";
import { TitleBarButton } from "../WindowTitleBar";

function SettingsWindow({ settingsData }: { settingsData: Settings }) {
  const setIsSettingsShowing = useStore((state) => state.setIsSettingsShowing);
  const [currentTab, setCurrentTab] = useState("Appearance");
  const colorInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (colorInput.current) {
      colorInput.current.value = settingsData["backgroundColor"];
    }
  }, [colorInput, settingsData]);

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
            <AppearanceTab colorInput={colorInput} />
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

const Window = styled.div<StyleProps>`
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
const GrayShade = styled.div<StyleProps>`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export default SettingsWindow;
