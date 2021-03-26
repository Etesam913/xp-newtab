import React from 'react'
import {Header1} from "../../styles/Headers";
import {FlexContainer} from "../../styles/Layout";
import {HexColorPicker} from "react-colorful";
import styled from "styled-components";


export function ColorAndImageTab({
                                     imageInput,
                                     backgroundImage,
                                     setBackgroundImage,
                                     colorInput,
                                     backgroundColor,
                                     setBackgroundColor
                                 }) {

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
        <article role="tabpanel">
            <Header1 margin={'1rem 0 1rem'}>Change Background Image</Header1>
            <FlexContainer justifyContent={'flex-start'} alignItems={"flex-start"} tablet>
                <TabInput
                    ref={imageInput}
                    defaultValue={backgroundImage}
                    placeholder={"Enter Image Url"}
                    width={"70%"}
                    onKeyDown={(e) => {
                        handleImageInputEnter(e)
                    }}/>
                <FlexContainer flexDirection="column" alignItems={"flex-start"}>
                    <button
                        onClick={() => {
                            setBackgroundImage(imageInput.current.value)
                        }}
                    >
                        Set Image
                    </button>
                    <RemoveButton
                        onClick={() => {
                            setBackgroundImage("")
                        }}
                    >
                        Remove Image
                    </RemoveButton>
                </FlexContainer>

            </FlexContainer>

            <Header1 margin={'1.5rem 0 1rem'}>Change Background Color</Header1>
            <FlexContainer tablet justifyContent={'flex-start'} alignItems={'flex-start'}>
                <TabInput
                    placeholder={'Enter Hex Color Code'}
                    ref={colorInput}
                    value={backgroundColor}
                    onKeyPress={(e) => {
                        handleKeyDown(e)
                    }}
                    onChange={(e) => {
                        setBackgroundColor(e.target.value + '')
                    }}
                    onKeyDown={(e) => {
                        handleColorInputEnter(e)
                    }}
                />
                <HexColorPicker color={backgroundColor} onChange={setBackgroundColor}/>
            </FlexContainer>

        </article>
    );
}

const TabInput = styled.input`
  margin-right: 1rem;
  width: ${props => props.width};
  @media only screen and (max-width: 768px) {
    margin-bottom: 1rem;
    width: 80%;
  }
`
const RemoveButton = styled.button`
  margin-top: 0.5rem;
`;

export function InfoTab() {
    return (
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
        </article>
    );
}

const InfoGrid = styled.div`
  margin-top: 0.25rem;
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-auto-rows: auto auto auto;
  align-self: center;
  row-gap: .75rem;
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

// Allows user to set settings such as grid, icon size
export function MiscTab() {

}

