import React, {useEffect, useContext, useState} from 'react'
import styled from 'styled-components'
import normalImg from '../../media/start-button.png'
import pressedImg from '../../media/start-button-pressed.png'
import blueBarImg from '../../media/blue-bar-img.png'
import timeBarImg from '../../media/time-bar-img.png'
import tabBackgroundImg from '../../media/test.png'
import {getTimePeriodName, getTimeUnits, getTwelveHourTime} from "../../functions/helpers";
import {AppContext} from "../../Contexts";

function Startbar() {
    const [time, setTime] = useState("");
    const {windowData, focusedWindow, setFocusedWindow} = useContext(AppContext);

    const tabs = windowData.map((item, index) => {
        return <Tab
            tabBackgroundImg={tabBackgroundImg}
            pressed={focusedWindow === item["id"]}
            onClick={() => {
                setFocusedWindow(item["id"])
            }}
            id={"tab-${index}"}
        >
            {item["windowTitle"]}
        </Tab>
    })

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
            <StartButton normalImg={normalImg} pressedImg={pressedImg}> </StartButton>
            <BlueSegment blueBarImg={blueBarImg}/>
            <TabContainer>
                {tabs}
            </TabContainer>
            <TimeSegment timeBarImg={timeBarImg}> {time} </TimeSegment>
        </Bar>
    );
}

const Bar = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
  display: flex;
  /*justify-content: space-between;*/
`;

const StartButton = styled.button`
  border: none !important;
  min-width: 99px !important;
  min-height: 30px !important;
  width: 99px;
  height: 30px;
  box-shadow: none !important;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  border-radius: 0px !important;
  background-image: url(${props => props.normalImg});

  :focus {
    outline: none !important;
  }

  :active {
    background-image: url(${props => props.pressedImg}) !important;
  }
`;
const BlueSegment = styled.div`
  background-image: url(${props => props.blueBarImg});
  width: 100%;
  position: absolute;
  height: 30px;
  z-index: -1;
`;

const TimeSegment = styled.div`
  width: 6rem;
  background-image: url(${props => props.timeBarImg});
  text-align: center;
  color: white;
  text-align: center;
  padding-top: 10px;
  font-family: 'Pixelated MS Sans Serif';
  margin-left: auto;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: white;

  font-family: 'Pixelated MS Sans Serif';
`;

const Tab = styled.button`
  width: 8rem;
  height: 80%;
  border-radius: 4px;
  color: white;
  text-align: center;
  border: none;
  font-size: 11px;
  border: 1px solid #164ef7;
  background: #397DF3 url(${props => props.tabBackgroundImg}) no-repeat 0 ${props => props.pressed ? "-75px" : "-7px"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: none !important;
  }

  :active {
    background: #397DF3 url(${props => props.tabBackgroundImg}) no-repeat 0 -75px !important;
  }
`;

export default Startbar;