import { syncDesktopFromStorage } from "./functions/sync";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import { ThemeStyles } from "./styles/ThemeStyles";
import type { StyleProps } from "./types";
import { useEffect } from "react";
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from "styled-components";
import RenderWindows from "./data/RenderWindows";
import RenderIcons from "./data/RenderIcons";
import SettingsWindow from "./components/SettingsWindow";
import Startbar from "./components/Startbar";
import { theme } from "./styles/theme";
import { useStore } from "./Store";
import { toggleEditOnKeyPress } from "./functions/helpers";
import TopBanner from "./components/TopBanner";

function App() {
  const isSettingsShowing = useStore((state) => state.isSettingsShowing);
  const settingsData = useStore((state) => state.settingsData);
  const storageError = useStore((state) => state.storageError);

  const toggleEditMode = useStore((state) => state.toggleEditMode);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      toggleEditOnKeyPress(event, toggleEditMode);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("storage", syncDesktopFromStorage);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("storage", syncDesktopFromStorage);
    };
  }, [toggleEditMode]);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop, target) =>
        typeof target !== "string" || isPropValid(prop)
      }
    >
      <ThemeProvider theme={theme}>
        <ThemeStyles windowsOS={settingsData.windowsOS} />
        <GlobalStyle
          windowsOS={settingsData["windowsOS"]}
          background={settingsData["backgroundColor"]}
          backgroundImage={settingsData["backgroundImage"]}
        />

        {isSettingsShowing && <SettingsWindow settingsData={settingsData} />}
        <TopBanner />
        {storageError && (
          <div
            role="alert"
            style={{
              position: "fixed",
              top: 0,
              zIndex: 100,
              background: "#fff4ce",
              padding: "0.5rem",
            }}
          >
            Your changes could not be saved. Free up browser storage before
            closing this tab.
          </div>
        )}
        <Wrapper id="wrapper" windowsOS={settingsData["windowsOS"]}>
          <RenderWindows />
          <RenderIcons />
        </Wrapper>
        <Startbar />
      </ThemeProvider>
    </StyleSheetManager>
  );
}

const Wrapper = styled.div<StyleProps>`
  height: calc(100vh - ${(props) => (props.windowsOS === 2 ? "47px" : "30px")});
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const GlobalStyle = createGlobalStyle<StyleProps>`
  body {
    background-attachment: fixed;
    background-position: center center;
    background-size: cover; 
    height: 100%;
    width: 100%;
    background: ${(props) => props.background};
    background-image: ${(props) => (props.backgroundImage ? `url(${JSON.stringify(props.backgroundImage)})` : "none")};
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    cursor: ${(props) => props.theme.cursors.auto};
    overflow: hidden;
    position: fixed;
    
    
  }
  ::selection{
    ${(props) =>
      props.windowsOS === 0 &&
      css`
        background: #1064cc;
      `};

    ${(props) =>
      props.windowsOS === 1 &&
      css`
        background: #010080;
      `};

      ${(props) =>
        props.windowsOS === 2 &&
        css`
          background: #1064cc;
        `};
      

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
