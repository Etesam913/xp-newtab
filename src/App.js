import "xp.css/dist/XP.css";
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import RenderWindows from "./data/RenderWindows";
import RenderIcons from "./data/RenderIcons";
import { AppContext } from "./Contexts";
import SettingsWindow from "./components/SettingsWindow";
import { getDefaultValue } from "./functions/helpers";
import Startbar from "./components/Startbar";


function App() {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(getDefaultValue("backgroundColor"));
  const [backgroundImage, setBackgroundImage] = useState(getDefaultValue("backgroundImage"));
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [iconData, setIconData] = useState(getDefaultValue("iconData"));
  const [windowData, setWindowData] = useState(getDefaultValue("windowData"));
  const [focusedWindow, setFocusedWindow] = useState(0);

  useEffect(() => {
    localStorage.setItem("windowData", JSON.stringify(windowData));
    console.log(windowData);
  }, [windowData]);

  useEffect(() => {
    localStorage.setItem("iconData", JSON.stringify(iconData));
    console.log(iconData);
  }, [iconData, setIconData]);


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
        setIconData
      }}>
      <GlobalStyle background={backgroundColor} backgroundImage={backgroundImage} />

      {isSettingsShowing &&
      <SettingsWindow
        setIsSettingsShowing={setIsSettingsShowing}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
      />}
      <Wrapper id="wrapper">
        <RenderWindows />
        <RenderIcons />
      </Wrapper>
      <Startbar />

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
    cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/auto.cur"), auto;
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

  a {
    cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/pointer.cur"), pointer;
  }

  button {
    cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/pointer.cur"), pointer;
    color: black;
  }
`;


export default App;
