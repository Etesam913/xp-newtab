import { Fragment, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

function getBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Chrome") > -1) {
      return "chrome"
  } else if (userAgent.indexOf("Firefox") > -1) {
      return "firefox"
  } else {
      return "other"
  }
  
}

function TopBanner() {
  const messages = [
    "📝 Did you know that the text component supports markdown syntax?",
    "😉 It would be greatly appreciated if you could write a review for the extension: ",
    "✨ Did you know that you can switch the theme from Windows XP to Windows 98 or Windows 7 in the settings menu?",
  ];
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [bannerIndex, setBannerIndex] = useState("");

  useEffect(() => {
    const luckyNumber = parseInt((Math.random() * 10).toFixed());
    if (luckyNumber === 1) {
      setShouldShowBanner(true);
      const messageIndex = parseInt(
        (Math.random() * (messages.length - 1)).toFixed()
      );
      setBannerIndex(messageIndex);
    }
  }, [messages.length]);

  if (shouldShowBanner) {
    return (
      <Banner>
        <BannerText>
          {bannerIndex === 0 && messages[0]}
          {bannerIndex === 1 && (
            <Fragment>
              {messages[1]}
              <BannerLink href={getBrowser() === "firefox" ? "https://addons.mozilla.org/en-US/firefox/addon/xp-newtab/" :  "https://chrome.google.com/webstore/detail/xp-newtab/ncfmlogaelpnniflgipmnnglhfiifkke"}>
                here
              </BannerLink>
            </Fragment>
          )}
          {bannerIndex === 2 && messages[2]}
        </BannerText>
        <CloseButton
          data-cy="close-banner-button"
          onClick={() => setShouldShowBanner(false)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"
            />
          </svg>
        </CloseButton>
      </Banner>
    );
  } else {
    return <Fragment />;
  }
}

const slideIn = keyframes`
  from{
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0px);
  }
`;

const Banner = styled.nav`
  background-color: rgba(10, 10, 10, 0.85);

  position: absolute;
  top: 0;
  width: 100%;
  padding: 0.5rem;
  z-index: 99;
  font-family: ${(props) => props.theme.fonts.primary};
  box-sizing: border-box;

  animation: ${slideIn} 0.35s ease-in-out;
`;

const BannerText = styled.p`
  color: white;
  text-align: center;
  width: calc(100% - 1.5rem);
  user-select: text;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0.3rem;
  top: 0.35rem;
  padding: 0;
  background: 0;
  color: white;
  border: 0;
  box-shadow: none !important;
  :hover {
    box-shadow: none !important;
    background: transparent !important;
  }

  :active {
    box-shadow: none !important;
    background: transparent !important;
  }
  :focus {
    box-shadow: none !important;
  }
`;

const BannerLink = styled.a`
  color: #1db6e9;
`;

export default TopBanner;
