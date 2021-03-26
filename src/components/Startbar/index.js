import React, {useEffect, useContext, useState, useRef} from 'react'
import {
    Bar,
    StartButton,
    BlueSegment,
    TimeSegment,
    Tab,
    TabContainer,
    StartWindow,
    StartHeader,
    StartBody, StartFooter
} from './styles'
import normalImg from '../../media/start-button.png'
import pressedImg from '../../media/start-button-pressed.png'
import blueBarImg from '../../media/blue-bar-img.png'
import timeBarImg from '../../media/time-bar-img.png'
import tabBackgroundImg from '../../media/tab-background.png'
import startFooterImg from '../../media/start-footer.png'
import startHeaderImg from '../../media/start-header.png'
import {getTimePeriodName, getTimeUnits, getTwelveHourTime} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {setWindowProperty} from "../Window/helper";
import {CreateWindowItem, EditModeItem, SettingsItem} from "./items";

function Startbar() {
    const [time, setTime] = useState("");
    const startButton = useRef(null);
    const startWindow = useRef(null);
    const [isStartWindowShowing, setIsStartWindowShowing] = useState(false);
    const {
        windowData,
        setWindowData,
        setFocusedWindow,
    } = useContext(AppContext);

    const tabs = windowData.map((item) => {
        const windowItem = item;
        return (
            <Tab
                tabBackgroundImg={tabBackgroundImg}
                pressed={!item["hidden"]}
                onClick={() => {
                    setFocusedWindow(item["id"]);
                    setWindowProperty(windowData, setWindowData, windowItem, "hidden", !item["hidden"])
                }}
                key={"tab-${index}"}
            >
                {item["windowTitle"]}
            </Tab>
        )
    })

    function handleBlur(e) {
        if (startWindow.current) {
            if (e.target !== startButton.current && !startWindow.current.contains(e.target)) {
                setIsStartWindowShowing(false)
            }
        }

    }

    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => {
            document.removeEventListener('click', handleBlur);

        }

    }, [])

    useEffect(() => {
        let timeUnits = getTimeUnits();
        let timeText = getTwelveHourTime(timeUnits["hour"]) + ":" + timeUnits["minutes"] + " " + getTimePeriodName(timeUnits["hour"])
        setTime(timeText);
        const interval = setInterval(() => {
            timeUnits = getTimeUnits();
            timeText = getTwelveHourTime(timeUnits["hour"]) + ":" + timeUnits["minutes"] + getTimePeriodName(timeUnits["hour"])
            setTime(timeText);
        }, 1000);
        return () => clearInterval(interval);
    }, [setTime])

    return (
        <Bar>
            <StartButton
                ref={startButton}
                normalImg={normalImg}
                pressedImg={pressedImg}
                isPressed={isStartWindowShowing}
                onClick={() => {
                    setIsStartWindowShowing(!isStartWindowShowing);
                }}
            />
            {isStartWindowShowing &&
            <StartWindow ref={startWindow}>
                <StartHeader image={startHeaderImg}> Administrator </StartHeader>
                <StartBody>
                    <EditModeItem/>
                    <SettingsItem setIsStartWindowShowing={setIsStartWindowShowing}/>
                    <CreateWindowItem/>
                </StartBody>
                <StartFooter image={startFooterImg}/>
            </StartWindow>
            }
            <BlueSegment blueBarImg={blueBarImg}/>
            <TabContainer>
                {tabs}
            </TabContainer>
            <TimeSegment timeBarImg={timeBarImg}> {time} </TimeSegment>
        </Bar>
    );
}


export default Startbar;