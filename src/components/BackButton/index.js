import React from 'react'
import styled from "styled-components";

function BackButton({margin, onClick}) {
    function handleClick() {
        if (onClick)
            onClick();
    }

    return (
        <ImageButton margin={margin}>
            <BackImage onClick={handleClick} alt={"image of back button"}
                       src={"https://etesam.nyc3.digitaloceanspaces.com/Windows-XP-Newtab/icons/back.png"}/>
        </ImageButton>
    );
}

const BackImage = styled.img`
  height: 24px;
  width: 24px;
`;

const ImageButton = styled.button`
  background: transparent !important;
  border: 0;
  box-shadow: none !important;
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: ${props => props.margin ? props.margin : "0 0.25rem 0 0"};
`;

export default BackButton;