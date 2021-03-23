import React, {useEffect, useContext, useState, useRef} from 'react'
import {Bar, StartButton, BlueSegment, TimeSegment, Tab, TabContainer, StartWindow} from './styles'
import normalImg from '../../media/start-button.png'
import pressedImg from '../../media/start-button-pressed.png'
import blueBarImg from '../../media/blue-bar-img.png'
import timeBarImg from '../../media/time-bar-img.png'
import tabBackgroundImg from '../../media/test.png'
import {getTimePeriodName, getTimeUnits, getTwelveHourTime} from "../../functions/helpers";
import {AppContext} from "../../Contexts";
import {setWindowProperty} from "../Window/helper";

function Startbar() {
    const [time, setTime] = useState("");
    const startButton = useRef(null)
    const [isStartWindowShowing, setIsStartWindowShowing] = useState(false);
    const {windowData, setWindowData, focusedWindow, setFocusedWindow} = useContext(AppContext);

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
    function handleBlur(e){
        if(e.target !== startButton.current){
            setIsStartWindowShowing(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return()=>{
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
                onBlur={()=>{
                    console.log("hi")
                }}
                onClick={() => {
                    setIsStartWindowShowing(!isStartWindowShowing);
                }}/>
            {isStartWindowShowing && <StartWindow> hi</StartWindow>}
            <BlueSegment blueBarImg={blueBarImg}/>
            <TabContainer>
                {tabs}
            </TabContainer>
            <TimeSegment timeBarImg={timeBarImg}> {time} </TimeSegment>
        </Bar>
    );
}


export default Startbar;