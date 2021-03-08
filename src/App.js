import React, {useState, useRef} from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import Menu from './components/Menu/index';
import RenderWindows from './data/RenderWindows';
import {lightTheme, darkTheme} from './styles/themeing';
import {Settings} from './styles/Components';
import {Cog} from './components/SvgMaster';
import {TopRight} from './styles/Layout';
import 'xp.css/dist/XP.css';
import SettingsWindow from "./components/SettingsWindow";

function App() {
    const mainWrapper = useRef(null);
    const [isSettingsShowing, setIsSettingsShowing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    const [windowData, setWindowData] = useState([
        {id: 0, windowTitle: 'Insert Title Here'},
        {id: 1, windowTitle: 'Wowza'},
    ]);

    /*let darkModeDefaultValue = false;
    if (window.localStorage.getItem('darkMode') !== null) {
        darkModeDefaultValue = JSON.parse(
            window.localStorage.getItem('darkMode').toLowerCase()
        );
    }*/

    //const [isDarkMode, setIsDarkMode] = useState(darkModeDefaultValue);

    return (
        <div>
            <GlobalStyle background={backgroundColor}/>
            <TopRight>
                <button
                    onClick={() => {
                        setIsSettingsShowing(true)
                    }}
                >
                    Settings
                </button>
            </TopRight>
            {isSettingsShowing &&
            <SettingsWindow setIsSettingsShowing={setIsSettingsShowing} backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}/>}
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
