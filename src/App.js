import React, {useState, useRef} from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import Menu from './components/Menu/index';
import RenderWindows from './data/RenderWindows';
import {TopRight} from './styles/Layout';
import 'xp.css/dist/XP.css';
import SettingsWindow from "./components/SettingsWindow";
import {getDefaultValue} from "./functions/helpers";


function App() {
    const mainWrapper = useRef(null);
    const [isSettingsShowing, setIsSettingsShowing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getDefaultValue("backgroundColor"));
    const [backgroundImage, setBackgroundImage] = useState(getDefaultValue("backgroundImage"))
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    const [windowData, setWindowData] = useState([
        {id: 0, windowTitle: 'Insert Title Here'},
        {id: 1, windowTitle: 'Wowza'},
    ]);

    return (
        <div>
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
            <SettingsWindow setIsSettingsShowing={setIsSettingsShowing} backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor} backgroundImage={backgroundImage}
                            setBackgroundImage={setBackgroundImage}
            />}
            <Wrapper ref={mainWrapper}>
                <RenderWindows wrapperRef={mainWrapper} windowData={windowData}/>

                <ShowMenuButton
                    onClick={() => {
                        setIsMenuShowing(true);
                    }}
                >
                    Show Menu
                </ShowMenuButton>
                <Menu
                    isMenuShowing={isMenuShowing}
                    setIsMenuShowing={setIsMenuShowing}
                    windowData={windowData}
                    setWindowData={setWindowData}
                />
            </Wrapper>
        </div>
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.background};
    background-image: url(${props => props.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: url('https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/CursorsXP.cur'), auto;
  }

  .window {
    font-size: 12px;
  }

  p {
    margin: 0;
  }

  button {
    cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/Cursor_15.cur"), pointer;
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
  cursor: url('https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/CursorsXP.cur'), auto;
`;

const ShowMenuButton = styled.button`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
`;

export default App;
