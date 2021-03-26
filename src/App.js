import 'xp.css/dist/XP.css';
import React, {useState, useEffect} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Menu from './components/Menu/index';
import RenderWindows from './data/RenderWindows';
import {TopRight} from './styles/Layout';
import {AppContext} from "./Contexts";
import SettingsWindow from "./components/SettingsWindow";
import {getDefaultValue} from "./functions/helpers";
import Startbar from "./components/Startbar";


function App() {
    const [isSettingsShowing, setIsSettingsShowing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getDefaultValue("backgroundColor"));
    const [backgroundImage, setBackgroundImage] = useState(getDefaultValue("backgroundImage"))
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    const [windowData, setWindowData] = useState(getDefaultValue("windowData"));
    const [focusedWindow, setFocusedWindow] = useState(0);

    useEffect(() => {
        localStorage.setItem("windowData", JSON.stringify(windowData));
        console.log(windowData)
    }, [windowData]);

    return (
        <AppContext.Provider
            value={{
                isMenuShowing,
                setIsMenuShowing,
                windowData,
                setWindowData,
                focusedWindow,
                setFocusedWindow,
                isSettingsShowing,
                setIsSettingsShowing
            }}>
            <GlobalStyle background={backgroundColor} backgroundImage={backgroundImage}/>
            {/*<TopRight>
                <button
                    onClick={() => {
                        setIsSettingsShowing(true)
                    }}>
                    Settings
                </button>
            </TopRight>*/}
            <Startbar/>
            {isSettingsShowing &&
            <SettingsWindow
                setIsSettingsShowing={setIsSettingsShowing}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                backgroundImage={backgroundImage}
                setBackgroundImage={setBackgroundImage}
            />}
            <Wrapper>
                <RenderWindows
                    windowData={windowData}
                    setWindowData={setWindowData}
                    isMenuShowing={isMenuShowing}
                />
                {/*<ShowMenuButton
                    onClick={() => {
                        setIsMenuShowing(true);
                    }}
                >
                    Edit Mode
                </ShowMenuButton>*/}
                {/*<Menu
                    isMenuShowing={isMenuShowing}
                    setIsMenuShowing={setIsMenuShowing}
                    windowData={windowData}
                    setWindowData={setWindowData}
                />*/}
            </Wrapper>
        </AppContext.Provider>
    );
}

const Wrapper = styled.div`
  height: 100vh;
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
`

const ShowMenuButton = styled.button`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 3;
`;

export default App;
