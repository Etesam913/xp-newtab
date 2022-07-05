import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  Bar,
  BlueSegment,
  TabContainer,
  WindowsXPStartButton,
  Windows98StartButton,
  GraySegment,
  Windows98Logo,
  WindowsXPTab,
  Windows98Tab,
  Windows98Bar,
  WindowsXPTimeSegment,
  Windows98TimeSegment,
} from "./styles";
import windows98Logo from "../../media/windows98-logo.png";
import normalImg from "../../media/start-button.png";
import pressedImg from "../../media/start-button-pressed.png";
import blueBarImg from "../../media/blue-bar-img.png";
import grayBarImg from "../../media/gray-bar-img.png";
import timeBarImg from "../../media/time-bar-img.png";
import tabBackgroundImg from "../../media/tab-background.png";
import {
  getTimePeriodName,
  getTimeUnits,
  getTwelveHourTime,
} from "../../functions/helpers";
import { setDataProperty } from "../Window/helper";
import { useStore } from "../../Store";
import StartWindow from "./StartWindow";

function Startbar() {
  const [time, setTime] = useState("");
  const startButton = useRef(null);
  const startWindow = useRef(null);
  const [isStartWindowShowing, setIsStartWindowShowing] = useState(false);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);
  const settingsData = useStore((state) => state.settingsData);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const tabs = windowData.map((item, index) => {
    const windowItem = item;
    return (
      <Fragment>
        {settingsData["isWindowsXP"] ? (
          <WindowsXPTab
            tabBackgroundImg={tabBackgroundImg}
            pressed={!item["hidden"]}
            onClick={() => {
              setFocusedWindow(item["id"]);
              setDataProperty(
                windowData,
                setWindowData,
                windowItem,
                "hidden",
                !item["hidden"]
              );
            }}
            key={`tab-${index}`}
            data-cy={`tab-${index}`}
          >
            {item["windowTitle"]}
          </WindowsXPTab>
        ) : (
          <Windows98Tab
            data-cy={`tab-${index}`}
            pressed={!item["hidden"]}
            onClick={() => {
              setFocusedWindow(item["id"]);
              setDataProperty(
                windowData,
                setWindowData,
                windowItem,
                "hidden",
                !item["hidden"]
              );
            }}
            active={true}
            key={`tab-${index}`}
          >
            {item["windowTitle"]}
          </Windows98Tab>
        )}
      </Fragment>
    );
  });

  function handleBlur(e) {
    if (startWindow.current) {
      if (
        e.target !== startButton.current &&
        !startWindow.current.contains(e.target)
      ) {
        setIsStartWindowShowing(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  useEffect(() => {
    let timeUnits = getTimeUnits();
    let timeText =
      getTwelveHourTime(timeUnits["hour"]) +
      ":" +
      timeUnits["minutes"] +
      " " +
      getTimePeriodName(timeUnits["hour"]);
    setTime(timeText);
    const interval = setInterval(() => {
      timeUnits = getTimeUnits();
      timeText =
        getTwelveHourTime(timeUnits["hour"]) +
        ":" +
        timeUnits["minutes"] +
        getTimePeriodName(timeUnits["hour"]);
      setTime(timeText);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <Bar>
      {settingsData["isWindowsXP"] ? (
        <WindowsXPStartButton
          data-cy="start-button"
          ref={startButton}
          normalImg={normalImg}
          pressedImg={pressedImg}
          isPressed={isStartWindowShowing}
          onClick={() => {
            setIsStartWindowShowing(!isStartWindowShowing);
          }}
        />
      ) : (
        <Fragment>
          <Windows98StartButton
            ref={startButton}
            onClick={() => {
              setIsStartWindowShowing(!isStartWindowShowing);
            }}
          >
            <Windows98Logo src={windows98Logo} alt="98-logo" />
            Start
          </Windows98StartButton>
          <Windows98Bar />
        </Fragment>
      )}

      {isStartWindowShowing && (
        <StartWindow
          isWindowsXP={settingsData["isWindowsXP"]}
          startWindow={startWindow}
          setIsStartWindowShowing={setIsStartWindowShowing}
        />
      )}
      {settingsData["isWindowsXP"] ? (
        <BlueSegment blueBarImg={blueBarImg} />
      ) : (
        <GraySegment grayBarImg={grayBarImg} />
      )}

      <TabContainer>{tabs}</TabContainer>
      {settingsData["isWindowsXP"] ? (
        <WindowsXPTimeSegment timeBarImg={timeBarImg}>
          {time}
        </WindowsXPTimeSegment>
      ) : (
        <Fragment>
          <Windows98Bar />
          <Windows98TimeSegment>{time}</Windows98TimeSegment>
        </Fragment>
      )}
    </Bar>
  );
}

export default Startbar;
