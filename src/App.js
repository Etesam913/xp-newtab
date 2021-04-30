import "xp.css/dist/XP.css";
import React, { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { HashRouter as Router, Route } from "react-router-dom";
import RenderWindows from "./data/RenderWindows";
import RenderIcons from "./data/RenderIcons";
import { AppContext, UserContext } from "./Contexts";
import SettingsWindow from "./components/SettingsWindow";
import { getDefaultValue } from "./functions/helpers";
import Startbar from "./components/Startbar";
import { theme } from "./styles/theme";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import PasswordReset from "./components/Pages/PasswordReset";
import { login, logout, onAuthStateChange } from "./firebase";


function App() {
  const [isSettingsShowing, setIsSettingsShowing] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [focusedWindow, setFocusedWindow] = useState(0);
  const [settingsData, setSettingsData] = useState(getDefaultValue("settingsData"));
  const [iconData, setIconData] = useState(getDefaultValue("iconData"));
  const [windowData, setWindowData] = useState(getDefaultValue("windowData"));
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(()=>{
    console.log(error)
  }, [error])

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

  const requestLogin = useCallback(( email, password) => {
    login(email, password).catch(error => setError(error.code));
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);


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
      <UserContext.Provider value={{ user }}>
        <ThemeProvider theme={theme}>
          <GlobalStyle
            background={settingsData["backgroundColor"]}
            backgroundImage={settingsData["backgroundImage"]}
          />
          <Router>
            <Route exact path="/">
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
            </Route>
            <Route exact path="/signin">
              <SignIn requestLogin={requestLogin} requestLogout={requestLogout}/>
            </Route>
            <Route exact path="/signup">
              <SignUp  />
            </Route>
            <Route exact path="/password-reset">
              <PasswordReset />
            </Route>
          </Router>
        </ThemeProvider>
      </UserContext.Provider>
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
    overflow: hidden;
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
    cursor: ${props => props.theme.cursors.auto};
  }

  a, select, option, button {
    cursor: ${props => props.theme.cursors.pointer};
  }

  button {
    color: black;
  }
`;


export default App;
