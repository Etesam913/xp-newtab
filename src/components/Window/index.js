import React, {useRef} from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable'
import {getSelectedComponent, updatePosition} from "./helper";

function Window({width, isMenuShowing, windowItem, windowData, setWindowData, windowId}) {
    const windowRef = useRef(null);
    const componentsPanel = useRef(null);

    return (
        <Draggable
            handle='.title-bar'
            nodeRef={windowRef}
            bounds="body"
            defaultPosition={{x: windowItem['xCoord'], y: windowItem['yCoord']}}
            onStop={() => {
                updatePosition(windowRef, windowItem, windowData, setWindowData)
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
                    <article style={{height: '100%'}} role="tabpanel">
                        <p>test</p>

                        {isMenuShowing &&
                        <ComponentsPanel ref={componentsPanel}>
                            <div className="field-row">Select one:</div>
                            <div className="field-row">
                                <input id={"header" + windowId} type="radio" name="radio-button"/>
                                <label htmlFor={"header" + windowId}>Header</label>
                            </div>
                            <div className="field-row">
                                <input id={"Link" + windowId} type="radio" name="radio-button"/>
                                <label htmlFor={"Link" + windowId}>Link</label>
                            </div>
                            <AddComponent
                                as={'button'}
                                onClick={() => {
                                    console.log(getSelectedComponent(componentsPanel))
                                }}>
                                Add Component
                            </AddComponent>
                        </ComponentsPanel>}


                    </article>
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
  font-family: 'Pixelated MS Sans Serif', 'Arial', serif;
  overflow: auto;
  position: absolute;
  transform-origin: 0% 50%;
`;

const TitleBar = styled.div`
  cursor: url("https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/cursors/move.cur"), move;
`

const ComponentsPanel = styled.fieldset`
  margin-top: 0.75rem;
`;

const AddComponent = styled(ComponentsPanel)`
`;

export default Window;
