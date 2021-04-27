import "xp.css/dist/XP.css";
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import RenderWindows from "./data/RenderWindows";
import RenderIcons from "./data/RenderIcons";
import { AppContext } from "./Contexts";
import SettingsWindow from "./components/SettingsWindow";
import { getDefaultValue } from "./functions/helpers";
import Startbar from "./components/Startbar";
import { theme } from "./styles/theme";


function App() {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [focusedWindow, setFocusedWindow] = useState(0);
  const [settingsData, setSettingsData] = useState(getDefaultValue("settingsData"));
  const [iconData, setIconData] = useState(getDefaultValue("iconData"));
  const [windowData, setWindowData] = useState(getDefaultValue("windowData"));

  useEffect(() => {
    localStorage.setItem("windowData", JSON.stringify(windowData));
    console.log(windowData);
  }, [windowData]);

  useEffect(() => {
    localStorage.setItem("iconData", JSON.stringify(iconData));
    console.log(iconData);
  }, [iconData, setIconData]);

  useEffect(() => {
    localStorage.setItem("settingsData", JSON.stringify(settingsData));
    console.log(settingsData);
  });


  return (
    <AppContext.Provider
      value={{
        isEditModeOn,
        setIsEditModeOn,
        windowData,
        setWindowData,
        focusedWindow,
        setFocusedWindow,
        isSettingsShowing,
        setIsSettingsShowing,
        iconData,
        setIconData,
        settingsData,
        setSettingsData
      }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle
          background={settingsData["backgroundColor"]}
          backgroundImage={settingsData["backgroundImage"]}
        />
        {isSettingsShowing &&
        <SettingsWindow
          setIsSettingsShowing={setIsSettingsShowing}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
        />}
        <Wrapper id="wrapper">
          <RenderWindows />
          <RenderIcons />
        </Wrapper>
        <Startbar />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 30px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.background};
    background-image: url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: ${props => props.theme.cursors.auto};
    overflow-x: hidden;
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

  a, select, option {
    cursor: ${props => props.theme.cursors.pointer};
  }

  button {
    cursor: ${props => props.theme.cursors.pointer};
    color: black;
  }
`;


export default App;
