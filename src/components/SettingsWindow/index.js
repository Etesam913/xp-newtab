import React, {useState} from 'react'
import styled from 'styled-components'
import {HexColorPicker} from "react-colorful";
import {Header1} from "../../styles/Headers";

function SettingsWindow({setIsSettingsShowing, backgroundColor, setBackgroundColor}) {
    const [currentTab, setCurrentTab] = useState("color");

    return (
        <div>
            <Window className={'window'}>
                <div className='title-bar'>
                    <div className='title-bar-text'> Settings</div>
                    <div className='title-bar-controls'>
                        <button aria-label='Close' onClick={() => {
                            setIsSettingsShowing(false)
                        }}/>
                    </div>
                </div>
                <div className="window-body">
                    <menu role="tablist">
                        <button aria-selected={currentTab === "color"} aria-controls="color" onClick={() => {
                            setCurrentTab("color")
                        }}>Color
                        </button>
                        <button aria-selected={currentTab === "info"} onClick={() => {
                            setCurrentTab("info")
                        }} aria-controls="info">Info
                        </button>
                    </menu>
                    {currentTab === 'color' &&
                    <article role="tabpanel">
                        <Header1 margin={'0 0 1rem'}>Change Color</Header1>
                        <HexColorPicker color={backgroundColor} onChange={setBackgroundColor}/>
                    </article>}
                    {currentTab === 'info' &&
                    <article role="tabpanel">
                        <Header1 margin={'0 0 1rem'}>Extension</Header1>

                    </article>}


                </div>
            </Window>
            <GrayShade onClick={() => {
                setIsSettingsShowing(false)
            }}/>
        </div>
    );
}

const Window = styled.div`
  width: 50rem;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pixelated MS Sans Serif', 'Arial';
  z-index: 3;
`

const GrayShade = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export default SettingsWindow