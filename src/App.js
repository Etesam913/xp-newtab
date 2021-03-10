import 'xp.css/dist/XP.css';
import React, {useState, useEffect} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Menu from './components/Menu/index';
import RenderWindows from './data/RenderWindows';
import {TopRight} from './styles/Layout';
import {AppContext} from "./Contexts";
import SettingsWindow from "./components/SettingsWindow";
import {getDefaultValue} from "./functions/helpers";


function App() {
    const [isSettingsShowing, setIsSettingsShowing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getDefaultValue("backgroundColor"));
    const [backgroundImage, setBackgroundImage] = useState(getDefaultValue("backgroundImage"))
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    const [windowData, setWindowData] = useState(getDefaultValue("windowData"));


    useEffect(() => {
        // Clear local storage
        /*setWindowData([
            {id: 0, windowTitle: 'Insert Title Here', xCoord: 0, yCoord: 0, items: []},
            {id: 1, windowTitle: 'Wowza', xCoord: 0, yCoord: 0, items: []},
        ])*/
        localStorage.setItem("windowData", JSON.stringify(windowData));
    }, [windowData]);

    return (
        <AppContext.Provider value={{isMenuShowing, windowData, setWindowData}}>
            <GlobalStyle background={backgroundColor} backgroundImage={backgroundImage}/>
            <TopRight>
                <button
                    onClick={() => {
                        setIsSettingsShowing(true)
                    }}>
                    Settings
                </button>
            </TopRight>
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
                <ShowMenuButton
                    onClick={() => {
                        setIsMenuShowing(true);
                    }}
                >
                    Edit Mode
                </ShowMenuButton>
                <Menu
                    isMenuShowing={isMenuShowing}
                    setIsMenuShowing={setIsMenuShowing}
                    windowData={windowData}
                    setWindowData={setWindowData}
                />
            </Wrapper>
        </AppContext.Provider>
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.background};
    background-image: url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/auto.cur"), auto;
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
  }
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

`;

const ShowMenuButton = styled.button`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
`;

export default App;
