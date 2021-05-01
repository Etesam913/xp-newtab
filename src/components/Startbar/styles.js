import styled, { css } from "styled-components";

export const Bar = styled.div`
  width: 100%;
  display: flex;
  /*justify-content: space-between;*/
`;

export const StartButton = styled.button`
  border: none !important;
  min-width: 99px !important;
  min-height: 30px !important;
  width: 99px;
  height: 30px;
  box-shadow: none !important;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  border-radius: 0 !important;
  background-image: url(${props => props.normalImg});

  :focus {
    outline: none !important;
  }

  :active {
    background-image: url(${props => props.pressedImg}) !important;
  }

  ${props => props.isPressed && css`
    background-image: url(${props => props.pressedImg}) !important;
  `}
`;
export const BlueSegment = styled.div`
  background-image: url(${props => props.blueBarImg});
  width: 100%;
  position: absolute;
  height: 30px;
  z-index: -1;
`;

export const TimeSegment = styled.div`
  width: 6rem;
  background-image: url(${props => props.timeBarImg});
  text-align: center;
  color: white;
  padding-top: 10px;
  font-family: ${props=>props.theme.fonts.primary};
  margin-left: auto;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: white;
  width: 100%;
  font-family: ${props=>props.theme.fonts.primary};
  overflow-x: auto;
`;

export const Tab = styled.button`
  width: 8rem;
  min-width: 1rem;
  height: 80%;
  border-radius: 4px;
  color: white;
  text-align: center;
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

export const StartWindow = styled.div`
  position: absolute;
  height: 30rem;
  width: 14rem;
  background: white;
  bottom: 1.8rem;
  border-top-right-radius: 0.35rem;
  border-top-left-radius: 0.35rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 4;
  box-shadow: 10px 10px 30px -17px rgba(0, 0, 0, 0.4);

`;

export const StartHeader = styled.header`
  height: 4rem;
  background-image: url(${props => props.image});
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.15rem;
  text-shadow: 0.5px 0.5px 2px #165ba3;
  text-align: center;
  padding: 0 .5rem;
`;

export const StartBody = styled.div`
  height: 23.5rem;
  display: flex;
  flex-direction: column;
`;

export const StartItemName = styled.span`
  font-family: ${props=>props.theme.fonts.primary};
  font-size: 0.9rem;
  margin: ${props => props.margin ? props.margin : "0 0 0 0.5rem"};
`;

export const StartItemIcon = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const StartFooter = styled.footer`
  height: 2.5rem;
  background-image: url(${props => props.image});
  font-weight: bold;
  display: flex;
`;

export const LoginButton = styled.button`
  border: 0;
  background: transparent;
  :hover{
    background: transparent;
    box-shadow: none !important;
    border: 0;
  }
  min-width: auto;
  :active{
    background: transparent !important;
  }
  :focus{
    background: transparent;
    outline: 0 !important;
  }
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: white;
`;

export const LoginImg = styled.img`
  margin: 0 0.4rem;
`;

export const ItemContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :hover {
    background: #2d6ac2;
    color: white;
  }
`;