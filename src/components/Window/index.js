import React, {useRef, useContext} from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable'
import {handleComponentCreation, updatePosition, renderComponents, updateWindowTitle, setHidden} from "./helper";
import {AppContext} from "../../Contexts";

function Window({width, windowItem, windowId}) {
    const windowRef = useRef(null);
    const componentsPanel = useRef(null);
    const {windowData, setWindowData, isMenuShowing} = useContext(AppContext)
    return (
        <Draggable
            handle='.title-bar'
            nodeRef={windowRef}
            bounds="body"
            defaultPosition={{x: windowItem['xCoord'], y: windowItem['yCoord']}}
            onStop={() => {
                updatePosition(windowRef, windowItem, windowData, setWindowData)
            }}
        >
            <WindowContainer
                ref={windowRef}
                width={width}
                className='window'
                hidden={windowItem["hidden"]}
            >
                <TitleBar className='title-bar'>
                    {isMenuShowing
                        ?
                        <TitleInput className='title-bar-text' defaultValue={windowItem['windowTitle']}
                                    onChange={(e) => {
                                        updateWindowTitle(e, windowData, setWindowData, windowItem)
                                    }}
                        />
                        :
                        <div className='title-bar-text'>
                            {windowItem['windowTitle']}
                        </div>
                    }

                    <div className='title-bar-controls'>
                        <button aria-label='Minimize' onClick={() => {
                            setHidden(windowData, setWindowData, windowItem, true)
                        }}/>
                        <button aria-label='Close'/>
                    </div>
                </TitleBar>

                <div className='window-body'>
                    <article style={{height: '100%'}} role="tabpanel">
                        {renderComponents(windowItem['items'], windowItem)}

                        {isMenuShowing &&
                        <ComponentsPanel ref={componentsPanel}>
                            <div className="field-row">Select one component to add:</div>
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
                                    handleComponentCreation(componentsPanel, windowData, setWindowData, windowItem);
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
  display: ${props => props.hidden && "none"};
  width: ${(props) => (props.width ? props.width : '20rem')};
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
const TitleInput = styled.input`
  color: black !important;
  font-family: 'Trebuchet MS';
  font-weight: 700;
  font-size: 13px;
  width: 100%;
`;

const ComponentsPanel = styled.fieldset`
  margin-top: 0.75rem;
`;

const AddComponent = styled(ComponentsPanel)`
`;

export default Window;

