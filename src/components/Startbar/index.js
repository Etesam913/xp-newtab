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
    StartBody, StartFooter, StartItemName, StartItemIcon
} from './styles'
import normalImg from '../../media/start-button.png'
import pressedImg from '../../media/start-button-pressed.png'
import blueBarImg from '../../media/blue-bar-img.png'
import timeBarImg from '../../media/time-bar-img.png'
import tabBackgroundImg from '../../media/test.png'
import startFooterImg from '../../media/start-footer.png'
import startHeaderImg from '../../media/start-header.png'
import controlPanelImg from '../../media/control-panel-icon.jpg';
import {getTimePeriodName, getTimeUnits, getTwelveHourTime} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {setWindowProperty} from "../Window/helper";
import {FlexContainer} from "../../styles/Layout";
import Toggle from "../Toggle";

function Startbar() {
    const [time, setTime] = useState("");
    const startButton = useRef(null);
    const startWindow = useRef(null);
    const [isStartWindowShowing, setIsStartWindowShowing] = useState(false);
    const {
        windowData,
        setWindowData,
        setIsSettingsShowing,
        setFocusedWindow,
        isMenuShowing,
        setIsMenuShowing
    } = useContext(AppContext);

    const tabs = windowData.map((item, index) => {
        const windowItem = item;
        return <Tab
            tabBackgroundImg={tabBackgroundImg}
            pressed={!item["hidden"]}
            onClick={() => {
                setFocusedWindow(item["id"]);
                setWindowProperty(windowData, setWindowData, windowItem, "hidden", !item["hidden"])
            }}
            id={"tab-${index}"}
        >
            {item["windowTitle"]}
        </Tab>
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
    })

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
                    <FlexContainer
                        onClick={() => {
                            setIsMenuShowing(!isMenuShowing)
                        }}
                        width={"max-content"}
                        cursor={"pointer"}
                        padding={"0.5rem"}
                        justifyContent={"flex-start"}>
                        <Toggle stateVal={isMenuShowing}/>
                        <StartItemName>Edit Mode</StartItemName>
                    </FlexContainer>
                    <FlexContainer
                        cursor={"pointer"}
                        padding={"0.5rem"}
                        justifyContent={"flex-start"}
                        width={"max-content"}
                        onClick={() => {
                            setIsSettingsShowing(true);
                            setIsStartWindowShowing(false);
                        }}
                    >
                        <StartItemIcon src={controlPanelImg}/>
                        <StartItemName>Settings</StartItemName>
                    </FlexContainer>
                </StartBody>
                <StartFooter image={startFooterImg}></StartFooter>
            </StartWindow>
            }
            <BlueSegment blueBarImg={blueBarImg}/>
            <TabContainer>
                {tabs}
            </TabContainer>
            <TimeSegment timeBarImg={timeBarImg}> {time} </TimeSegment>
        </Bar>
    );
};


export default Startbar;