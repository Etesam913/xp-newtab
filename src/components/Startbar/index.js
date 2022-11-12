import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  Bar,
  TabContainer,
  WindowsXPStartButton,
  Windows98StartButton,
  Windows98Logo,
  WindowsXPTab,
  Windows98Tab,
  Windows7Tab,
  Windows98Bar,
  WindowsXPTimeSegment,
  Windows98TimeSegment,
  WindowsXPSegment,
  Windows98Segment,
  Windows7Segment,
  Windows7TimeSegment,
  Windows7StartButton,
} from "./styles";
import windows98Logo from "../../media/windows98-logo.png";
import windows7Logo from "../../media/windows7-logo.png";
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
        {settingsData["windowsOS"] === 0 && (
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
        )}
        {settingsData["windowsOS"] === 1 && (
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

        {settingsData["windowsOS"] === 2 && (
          <Windows7Tab
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
          </Windows7Tab>
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
    <Bar windowsOS={settingsData["windowsOS"]}>
      {settingsData["windowsOS"] === 0 && (
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
      )}
      {settingsData["windowsOS"] === 1 && (
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

      {settingsData["windowsOS"] === 2 && (
        <Fragment>
          <Windows7StartButton
            backgroundImage={windows7Logo}
            ref={startButton}
            onClick={() => {
              setIsStartWindowShowing(!isStartWindowShowing);
            }}
          ></Windows7StartButton>
        </Fragment>
      )}

      {isStartWindowShowing && (
        <StartWindow
          windowsOS={settingsData["windowsOS"]}
          startWindow={startWindow}
          setIsStartWindowShowing={setIsStartWindowShowing}
        />
      )}
      {settingsData["windowsOS"] === 0 && (
        <WindowsXPSegment blueBarImg={blueBarImg} />
      )}
      {settingsData["windowsOS"] === 1 && (
        <Windows98Segment grayBarImg={grayBarImg} />
      )}
      {settingsData["windowsOS"] === 2 && (
        <Windows7Segment grayBarImg={grayBarImg} />
      )}
      <TabContainer windowsOS={settingsData["windowsOS"]}>{tabs}</TabContainer>

      {settingsData["windowsOS"] === 0 && (
        <WindowsXPTimeSegment timeBarImg={timeBarImg}>
          {time}
        </WindowsXPTimeSegment>
      )}
      {settingsData["windowsOS"] === 1 && (
        <Fragment>
          <Windows98Bar />
          <Windows98TimeSegment>{time}</Windows98TimeSegment>
        </Fragment>
      )}
      {settingsData["windowsOS"] === 2 && (
        <Fragment>
          <Windows7TimeSegment>
            <div>{time}</div>
            <div>6/18/2020</div>
          </Windows7TimeSegment>
        </Fragment>
      )}
    </Bar>
  );
}

export default Startbar;
