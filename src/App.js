import React, {useState, useRef} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Menu from './components/Menu/index';
import RenderWindows from './data/RenderWindows';
import {lightTheme, darkTheme} from './styles/themeing';
import {DarkModeButton} from './styles/Components';
import {Sun, Moon} from './components/SvgMaster';
import {TopRight} from './styles/Layout';
import 'xp.css/dist/XP.css';

function App() {
    const mainWrapper = useRef(null);
    const [isMenuShowing, setIsMenuShowing] = useState(false);

    const [windowData, setWindowData] = useState([
        {id: 0, windowTitle: 'Insert Title Here'},
        {id: 1, windowTitle: 'Wowza'},
    ]);
    let darkModeDefaultValue = false;
    if (window.localStorage.getItem('darkMode') !== null) {
        darkModeDefaultValue = JSON.parse(
            window.localStorage.getItem('darkMode').toLowerCase()
        );
    }

    const [isDarkMode, setIsDarkMode] = useState(darkModeDefaultValue);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <TopRight>
                <DarkModeButton
                    whileTap={{scale: 0.9}}
                    whileHover={{scale: 1.1}}
                    onClick={() => {
                        window.localStorage.setItem('darkMode', !isDarkMode);
                        setIsDarkMode(!isDarkMode);
                        console.log(window.localStorage.getItem('darkMode'));
                    }}
                >
                    {!isDarkMode ? <Sun/> : <Moon/>}
                </DarkModeButton>
            </TopRight>
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
        </ThemeProvider>
    );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  transition: background-color 150ms;
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
