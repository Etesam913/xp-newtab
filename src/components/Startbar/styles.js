import styled, { css } from "styled-components";

export const Bar = styled.div`
  width: 100%;
  display: flex;
  z-index: 4;
  position: absolute;
  align-items: center;
  height: ${(props) => (props.windowsOS === 2 ? "47px" : "30px")};
`;

export const WindowsXPStartButton = styled.button`
  border: none !important;
  min-width: 99px !important;
  min-height: 30px !important;
  width: 99px;
  height: 30px;
  box-shadow: none !important;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  border-radius: 0 !important;
  background-image: url(${(props) => props.normalImg});

  :focus {
    outline: none !important;
  }

  :active {
    background-image: url(${(props) => props.pressedImg}) !important;
  }

  ${(props) =>
    props.isPressed &&
    css`
      background-image: url(${(props) => props.pressedImg}) !important;
    `}
`;

export const Windows98StartButton = styled.button`
  font-weight: bold;
  height: 23px;
  margin: 0 4px 0 4px;
  min-width: 60px !important;
  display: flex;
  align-items: center;
  padding: 0 0 0 5px;

  &:active {
    padding: 0 0 0 5px !important;
  }
`;

export const Windows98Bar = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 20px;
  width: 5px;
  border-color: rgb(254, 254, 254) rgb(132, 133, 132) rgb(132, 133, 132)
    rgb(254, 254, 254);
  border-style: solid;
  border-width: 2px;
  background: rgb(198, 198, 198) none repeat scroll 0 0;
`;

export const Windows7StartButton = styled.button`
  height: 100%;
  width: 80px;

  background-image: url(${(props) => props.backgroundImage});
  padding: 0;
  background-position-x: 4px;
  background-position-y: -7px;
  &:hover {
    background-color: none !important;
    background-position-x: 4px !important;
    background-position-y: -60px !important;
    background-image: url(${(props) => props.backgroundImage}) !important;
  }

  &:active {
    background-color: none !important;
    background-position-x: 4px !important;
    background-position-y: -114px !important;
    background-image: url(${(props) => props.backgroundImage}) !important;
  }
`;

export const Windows98Logo = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 2px;
  pointer-events: none;
`;

export const WindowsXPSegment = styled.div`
  background-image: url(${(props) => props.blueBarImg});
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: -1;
`;

export const Windows98Segment = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: -1;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(254, 254, 254) rgb(10, 10, 10) rgb(10, 10, 10)
    rgb(254, 254, 254);
  box-shadow: rgb(223, 223, 223) 1px 1px 0px 1px inset,
    rgb(132, 133, 132) -1px -1px 0px 1px inset;
  box-sizing: border-box;
  background: rgb(198, 198, 198) none repeat scroll 0 0;
`;

export const Windows7Segment = styled.div`
  background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0.4),
      rgba(0, 0, 0, 0.1),
      hsla(0, 0%, 100%, 0.2)
    ),
    linear-gradient(
      55deg,
      transparent,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.1) 50%,
      transparent 53%
    ),
    #4580c4cf;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  box-shadow: inset 0 0.5px #fff;
`;

export const WindowsXPTimeSegment = styled.div`
  width: 6rem;
  background-image: url(${(props) => props.timeBarImg});
  text-align: center;
  color: white;
  font-family: ${(props) => props.theme.fonts.primary};
  margin-left: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Windows98TimeSegment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
  font-family: ${(props) => props.theme.fonts.primary};
  border-style: solid;
  border-width: 1px;
  border-color: rgb(128, 128, 128) rgb(255, 255, 255) rgb(255, 255, 255)
    rgb(128, 128, 128);
  height: 20px;
  box-sizing: border-box;
  margin: 0 8px 0 4px;
  padding: 0 10px;
  white-space: nowrap;
`;

export const Windows7TimeSegment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
  font-family: "Helvetica";
  box-sizing: border-box;
  margin: 0 4px 0 4px;

  white-space: nowrap;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8rem;
  justify-content: space-evenly;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;
  color: white;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.primary};
  overflow-x: auto;
  height: 30px;
`;

export const WindowsXPTab = styled.button`
  width: 8rem;
  min-width: 1rem;
  height: 80%;
  border-radius: 4px;
  color: white;
  text-align: center;
  font-size: 11px;
  border: 1px solid #164ef7;
  background: #397df3 url(${(props) => props.tabBackgroundImg}) no-repeat 0
    ${(props) => (props.pressed ? "-75px" : "-7px")};
  white-space: nowrap;
  overflow: hidden;
  box-shadow: none !important;
  text-overflow: ellipsis;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: none !important;
  }

  :active {
    background: #397df3 url(${(props) => props.tabBackgroundImg}) no-repeat 0 -75px !important;
  }
`;

export const Windows98Tab = styled.button`
  width: 8rem;
  min-width: 1rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 6px;
  margin: 0 2px;

  :active {
    padding: 0 6px !important;
  }

  ${(props) =>
    props.pressed &&
    css`
      box-sizing: border-box;
      background-repeat: repeat;
      background-attachment: scroll;
      background-origin: padding-box;
      background-clip: border-box;
      border-style: solid;
      border-width: 2px;
      border-color: rgb(45, 45, 45) rgb(254, 254, 254) rgb(254, 254, 254)
        rgb(77, 77, 77);
      box-shadow: rgb(132, 133, 132) 1px 1px 0px 1px inset,
        rgb(223, 223, 223) -1px -1px 0px 1px inset;
      background-image: linear-gradient(
          45deg,
          rgb(198, 198, 198) 25%,
          transparent 25%,
          transparent 75%,
          rgb(198, 198, 198) 75%
        ),
        linear-gradient(
          45deg,
          rgb(198, 198, 198) 25%,
          transparent 25%,
          transparent 75%,
          rgb(198, 198, 198) 75%
        );
      background-color: rgb(254, 254, 254);
      background-size: 4px 4px;
      background-position: 0px 0px, 2px 2px;
    `}
`;

export const WindowsXPStartWindow = styled.div`
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

export const WindowsXPStartHeader = styled.header`
  height: 4rem;
  background-image: url(${(props) => props.image});
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.15rem;
  text-shadow: 0.5px 0.5px 2px #165ba3;
  text-align: center;
  padding: 0 0.5rem;
`;

export const WindowsXPStartBody = styled.div`
  height: 23.5rem;
  display: flex;
  flex-direction: column;
`;

export const StartItemName = styled.span`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 0.9rem;
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0.5rem")};
`;

export const StartItemIcon = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const WindowsXPStartFooter = styled.footer`
  height: 2.5rem;
  background-image: url(${(props) => props.image});
  font-weight: bold;
  display: flex;
`;

export const Windows98StartWindow = styled.div`
  position: absolute;
  height: 23rem;
  width: 14rem;
  background: #bfc7c9;
  bottom: 1.8rem;
  border-top-right-radius: 0.35rem;
  border-top-left-radius: 0.35rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 4;
  box-shadow: 10px 10px 30px -17px rgba(0, 0, 0, 0.4);
`;

export const Windows98BlueStripe = styled.div`
  height: 100%;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 156, 1) 0%,
    rgba(33, 33, 223, 1) 14%,
    rgba(0, 0, 124, 1) 38%,
    rgba(0, 0, 124, 1) 100%
  );
  color: white;
  font-size: 1.5rem;
  writing-mode: tb-rl;
  transform: rotate(-180deg);
`;

export const Windows98StartBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Windows98BoldText = styled.b`
  padding-top: 0.5rem;
`;

export const LoginButton = styled.button`
  border: 0;
  background: transparent;
  :hover {
    background: transparent;
    box-shadow: none !important;
    border: 0;
  }
  min-width: auto;
  :active {
    background: transparent !important;
  }
  :focus {
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

export const WindowsXPItemContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: #2d6ac2;
    color: white;
  }
`;

export const Windows98ItemContainer = styled(WindowsXPItemContainer)`
  :hover {
    background: #010080;
    color: white;
  }
`;
