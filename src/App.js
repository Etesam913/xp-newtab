import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { Header3 } from './styles/Headers';
import Today from './components/Today';
import { lightTheme, darkTheme } from './styles/themeing';
import { DarkModeButton } from './styles/Components';
import { Sun, Moon } from './components/SvgMaster';
import { ItemGrid, TopRight } from './styles/Layout';

function App() {
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
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            window.localStorage.setItem('darkMode', !isDarkMode);
            setIsDarkMode(!isDarkMode);
            console.log(window.localStorage.getItem('darkMode'));
          }}
        >
          {!isDarkMode ? <Sun /> : <Moon />}
        </DarkModeButton>
      </TopRight>
      <Wrapper>
        <Content
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NameInput
            margin='0.75rem'
            placeholder='Insert Name here'
            defaultValue={window.localStorage.getItem('name')}
            onChange={(e) => {
              window.localStorage.setItem('name', e.target.value);
            }}
          />
          <Today />
          <ItemGrid>
            <Header3>test1</Header3>
            <Header3>test2</Header3>
            <Header3>test3</Header3>
            <Header3>test4</Header3>
            <Header3>test5</Header3>
            <Header3>test6</Header3>
          </ItemGrid>
        </Content>
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
`;
const Content = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NameInput = styled.input`
  border: none;
  background: none;
  margin: ${(props) => (props.margin ? props.margin : '1rem')};
  font-family: 'Airbnb Cereal App';
  font-size: 3.25em;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
  transition: color 150ms;
`;

export default App;
