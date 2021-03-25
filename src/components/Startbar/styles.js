import styled, {css} from "styled-components";

export const Bar = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
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
  -ms-backface-visibility: hidden;
  border-radius: 0px !important;
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
  text-align: center;
  padding-top: 10px;
  font-family: 'Pixelated MS Sans Serif';
  margin-left: auto;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: white;
  font-family: 'Pixelated MS Sans Serif';
`;

export const Tab = styled.button`
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
`;

export const StartHeader = styled.header`
  height: 4rem;
  background-image: url(${props => props.image});
  background-repeat-y: no-repeat;
  font-family: "Arial";
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.15rem;
  text-shadow: 0.5px 0.5px 2px #165ba3;
  text-align: center;
  padding: 0 .5rem;
`

export const StartBody = styled.div`
  height: 23.5rem;
  display: flex;
  flex-direction: column;
`;

export const StartItemName = styled.span`
  font-family: 'Pixelated MS Sans Serif';
  font-size: 0.9rem;
  margin: ${props=>props.margin ? props.margin : '0 0 0 0.5rem'};
`;

export const StartItemIcon = styled.img`
  
`;

export const StartFooter = styled.footer`
  height: 2.5rem;
  background-image: url(${props => props.image});
  font-family: "Arial";
  font-weight: bold;
  display: flex;
`;
