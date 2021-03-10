import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {HexColorPicker} from "react-colorful";
import {Header1} from "../../styles/Headers";
import {FlexContainer} from "../../styles/Layout";
import {ColorAndImageTab, InfoTab} from "./Tabs";

function SettingsWindow({
                            setIsSettingsShowing,
                            backgroundColor,
                            setBackgroundColor,
                            backgroundImage,
                            setBackgroundImage
                        }) {
    const [currentTab, setCurrentTab] = useState("image/color");
    const imageInput = useRef(null);
    const colorInput = useRef(null);

    useEffect(() => {
        imageInput.current.value = backgroundImage;
        colorInput.current.value = backgroundColor;
    }, [imageInput, colorInput])

    useEffect(() => {
        localStorage.setItem("backgroundColor", backgroundColor);
        localStorage.setItem("backgroundImage", backgroundImage);
    }, [backgroundColor, backgroundImage]);

    function handleColorInputEnter(e) {
        if (e.keyCode === 13) setBackgroundColor(e.target.value)
    }

    function handleImageInputEnter(e) {
        if (e.keyCode === 13) setBackgroundImage(e.target.value)
    }

    function handleKeyDown(e) {
        // Do not allow open and closed parenthesis
        if (e.which === 40 || e.which === 41) {
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
                        <button aria-selected={currentTab === "image/color"} aria-controls="color" onClick={() => {
                            setCurrentTab("image/color")
                        }}>Image/Color
                        </button>
                        <button aria-selected={currentTab === "info"} onClick={() => {
                            setCurrentTab("info")
                        }} aria-controls="info">Info
                        </button>
                    </menu>

                    {currentTab === 'image/color' &&
                    <ColorAndImageTab
                        imageInput={imageInput}
                        colorInput={colorInput}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        backgroundImage={backgroundImage}
                        setBackgroundImage={setBackgroundImage}
                    />}

                    {currentTab === 'info' && <InfoTab/>}
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
  @media only screen and (max-width: 768px) {
    width: 80% !important;
  }
`
const GrayShade = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export default SettingsWindow