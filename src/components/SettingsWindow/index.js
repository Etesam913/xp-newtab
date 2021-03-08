import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {HexColorPicker} from "react-colorful";
import {Header1} from "../../styles/Headers";
import {FlewContainer} from "../../styles/Layout";

function SettingsWindow({setIsSettingsShowing, backgroundColor, setBackgroundColor}) {
    const [currentTab, setCurrentTab] = useState("color");

    useEffect(() => {
        localStorage.setItem("backgroundColor", backgroundColor);
    }, [backgroundColor]);

    function handleEnter(e) {
        if (e.keyCode === 13) {
            setBackgroundColor(e.target.value)
        }
    }

    function handleKeyDown(e){
        // Do not allow open and closed parenthesis
        if(e.which === 40 || e.which === 41){
            e.preventDefault();
        }
    }

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
                        <Header1 margin={'0 0 1rem'}>Change Background Color</Header1>
                        <FlewContainer tablet justifyContent={'flex-start'} alignItems={'flex-start'}>
                            <ColorInput
                                placeholder={'hex color code'}
                                value={backgroundColor}
                                onKeyPress={(e)=>{handleKeyDown(e)}}
                                onChange={(e) => {
                                    setBackgroundColor(e.target.value + '')
                                }}
                                onKeyDown={(e) => {
                                    handleEnter(e)
                                }}
                            />
                            <HexColorPicker color={backgroundColor} onChange={setBackgroundColor}/>
                        </FlewContainer>

                    </article>}

                    {currentTab === 'info' &&
                    <article role="tabpanel">
                        <Header1 margin={'0 0 1rem'}>Windows XP New Tab</Header1>
                        <InfoGrid>
                            <p style={{marginRight: "0.5rem"}}>GitHub Link: </p>
                            <a href={'https://github.com/Etesam913/windowsxp-newtab'}>
                                https://github.com/Etesam913/windowsxp-newtab
                            </a>

                            <p style={{marginRight: "0.5rem"}}>Firefox Addon Link: </p>
                            <a href={'https://github.com/Etesam913/windowsxp-newtab'}>
                                https://github.com/Etesam913/windowsxp-newtab
                            </a>

                            <p style={{marginRight: "0.5rem"}}>Chrome Addon Link: </p>
                            <a href={'https://github.com/Etesam913/windowsxp-newtab'}>
                                https://github.com/Etesam913/windowsxp-newtab
                            </a>

                        </InfoGrid>
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
  width: 37rem;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pixelated MS Sans Serif', 'Arial', serif;
  z-index: 3;
  @media only screen and (max-width: 768px){
    width: 80% !important;
  }
`

const ColorInput = styled.input`
  margin-right: 1rem;
  @media only screen and (max-width: 768px){
    margin-bottom: 1rem;
  }
`

const InfoGrid = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-auto-rows: auto auto auto;
  align-self: center;
  row-gap: .75rem;
  @media only screen and (max-width: 768px){
    grid-template-columns: auto;
  }
`;

const GrayShade = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export default SettingsWindow