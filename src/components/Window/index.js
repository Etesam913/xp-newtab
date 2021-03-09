import React, {useRef} from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable'
import {getTranslateXY} from "../../functions/helpers";

function Window({width, wrapperRef, windowItem, windowData, setWindowData}) {
    const windowRef = useRef(null);

    function updatePosition() {
        const positions = getTranslateXY(windowRef.current)
        const xPos = positions["translateX"];
        const yPos = positions["translateY"];
        let itemToInsert = {...windowItem};
        itemToInsert["xCoord"] = xPos
        itemToInsert["yCoord"] = yPos
        let tempData = [...windowData];
        const desired_id = windowItem["id"];
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i]["id"] === desired_id) {
                tempData[i] = itemToInsert;
            }
        }
        setWindowData(tempData)
    }

    return (
        <Draggable handle='.title-bar' nodeRef={windowRef} bounds="body"
                   defaultPosition={{x: windowItem['xCoord'], y: windowItem['yCoord']}} onStop={() => {
            updatePosition()
        }}>
            <WindowContainer
                ref={windowRef}
                width={width}
                className='window'
            >
                <TitleBar className='title-bar'>
                    <div className='title-bar-text'>
                        {windowItem ? windowItem['windowTitle'] : 'Insert Title Here'}
                    </div>
                    <div className='title-bar-controls'>
                        <button aria-label='Close'/>
                    </div>
                </TitleBar>

                <div className='window-body'>
                    <p style={{textAlign: 'center'}}>Current count</p>
                </div>
            </WindowContainer>
        </Draggable>
    );
}

const WindowContainer = styled.div`
  width: ${(props) => (props.width ? props.width : '18.75rem')};
  min-width: 15rem;
  min-height: 4rem;
  max-width: 60rem;
  max-height: 40rem;
  resize: both;
  font-family: 'Pixelated MS Sans Serif', 'Arial', serif;
  overflow: auto;
  position: absolute;
  transform-origin: 0% 50%;
`;

const TitleBar = styled.div`
  cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/move.cur"), move;
`

export default Window;
