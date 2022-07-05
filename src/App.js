//import windows98CSS from "xp.css/dist/98.css";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import RenderWindows from "./data/RenderWindows";
import RenderIcons from "./data/RenderIcons";
import SettingsWindow from "./components/SettingsWindow";
import Startbar from "./components/Startbar";
import { theme } from "./styles/theme";
import { useStore } from "./Store";

function App() {
  const isSettingsShowing = useStore((state) => state.isSettingsShowing);
  const settingsData = useStore((state) => state.settingsData);
  const iconData = useStore((state) => state.iconData);
  const windowData = useStore((state) => state.windowData);

  useEffect(() => {
    localStorage.setItem("windowData", JSON.stringify(windowData));
  }, [windowData]);

  useEffect(() => {
    localStorage.setItem("iconData", JSON.stringify(iconData));
  }, [iconData]);

  useEffect(() => {
    localStorage.setItem("settingsData", JSON.stringify(settingsData));
  }, [settingsData]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle
        isWindowsXP={settingsData["isWindowsXP"]}
        background={settingsData["backgroundColor"]}
        backgroundImage={settingsData["backgroundImage"]}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={settingsData["stylesheet"]}
      />
      {isSettingsShowing && <SettingsWindow settingsData={settingsData} />}
      <Wrapper id="wrapper">
        <RenderWindows />
        <RenderIcons />
      </Wrapper>
      <Startbar />
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 30px);
  width: 100vw;
  overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.background};
    background-image: url(${(props) => props.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: ${(props) => props.theme.cursors.auto};
    overflow: hidden;
    
  }
  ::selection{
    background: ${(props) => (props.isWindowsXP ? "#1064cc" : "#010080")};
    color: white;
  }
  .window {
    font-size: 12px;
  }

  input {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  label {
    cursor: ${(props) => props.theme.cursors.auto};
  }

  a, select, option, button {
    cursor: ${(props) => props.theme.cursors.pointer};
  }

  button {
    color: black;
  }
`;

export default App;
