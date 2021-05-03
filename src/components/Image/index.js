import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions } from "../ComponentOptions";
import { AppContext } from "../../Contexts";
import { changeItemProperty, handleDelete } from "../Window/helper";
import BackButton from "../BackButton/index";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents"

function Image({ windowObj, windowItem }) {
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [isRedirectClicked, setIsRedirectClicked] = useState(false);
  const [imageWidth, setImageWidth] = useState("300px");
  const srcInput = useRef(null);
  const redirectInput = useRef(null);
  const redirectButton = useRef(null);

  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);

  function handleOptions() {
    function setImageUrl() {
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "src",
        srcInput.current.value.trim()
      );
      setIsImageFocused(false);
    }


    function setRedirectUrl() {
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "href",
        redirectInput.current.value
      );
      setIsRedirectClicked(false);
    }


    if (!isImageFocused && !isRedirectClicked) {
      return (
        <FlexContainer width={"100%"}>
          <TextAlignOptions windowItem={windowItem} windowObj={windowObj} />
          <OptionsButton onClick={() => {
            {imageWidth === "100%" ? setImageWidth("300px") : setImageWidth("100%")}
          }}>{imageWidth === "100%" ? "Revert to Original" : "Fit Size To Window"}</OptionsButton>
          <OptionsButton
            onClick={() => {
              setIsRedirectClicked(true);
            }}
            width="95px"
          >
            Set Image Url
          </OptionsButton>
        </FlexContainer>
      );
    } else if (isImageFocused) {
      return (
        <FlexContainer width={"100%"}>
          <input
            ref={redirectInput}
            style={{ width: "100%" }}
            placeholder={"Enter redirect url"}
            defaultValue={windowItem["href"]}
            onBlur={handleBlur}
          />
          <OptionsButton
            onClick={setRedirectUrl}
            width="140px"
            ref={redirectButton}
          >
            Set Redirect Url
          </OptionsButton>
        </FlexContainer>
      );
    } else if (isRedirectClicked) {
      return (
        <FlexContainer width={"100%"}>
          <BackButton
            aria-label="back button"
            margin={"0 0.25rem 0 0"}
            onClick={() => {
              setIsRedirectClicked(false);
            }}
          />
          <input
            ref={srcInput}
            style={{ width: "87%" }}
            placeholder={"Enter image url"}
            defaultValue={windowItem["src"] !== null ? windowItem["src"] : ""}
            /*onBlur={handleBlur}*/
          />
          <OptionsButton
            onClick={setImageUrl}
            width="110px"
          >
            Set Image Url
          </OptionsButton>
        </FlexContainer>
      );
    }
  }


  function handleBlur() {
    // Timeout is needed to allow for enough time to check if the user clicked on the src input after the blur.
    // If they did, do not count that as removing image focus
    let redirectButtonClicked = false;
    if (redirectButton && redirectButton.current) {
      redirectButton.current.addEventListener("click", function() {
        redirectButtonClicked = true;
      });
    }

    setTimeout(function() {
      if (redirectInput && redirectInput.current !== document.activeElement) {
        setIsImageFocused(false);
      }
      if (!redirectButtonClicked) {
        setIsRedirectClicked(false);
      }

    }, 200);
    if (redirectButton && redirectButton.current) {
      redirectButton.current.removeEventListener("click", function() {
        redirectButtonClicked = true;
      });
    }

  }

// TODO: Get window size so that image can be resized correctly if the window size is changed.

  return (
      <FlexContainer flexDirection={"column"} alignItems="center">
        {isEditModeOn &&
        <FlexContainer margin={"0 0 .5rem 0"} width={"100%"}>
          {handleOptions()}
        </FlexContainer>
        }

        <FlexContainer justifyContent={windowItem["justifyContent"]} width="100%">
          <ImageWrapper
            href={isEditModeOn ? null : (windowItem["href"] === "" ? "javascript:void(0)" : windowItem["href"])}
            onFocus={() => {
              setIsRedirectClicked(false);
              setIsImageFocused(true);
            }}
            onBlur={() => {
              handleBlur();
            }}
            tabIndex={0}
            imageWidth={imageWidth}
          >
            <ImageComponent src={windowItem["src"]} />
          </ImageWrapper>
        </FlexContainer>
        {isEditModeOn &&
        <DeleteButton
          margin={"0.5rem 0 0"}
          onClick={() => {
            handleDelete(windowData, setWindowData, windowObj, windowItem["id"]);
          }}>
          Delete
        </DeleteButton>}
      </FlexContainer>
  );
}

const ImageComponent = styled.img`
  width: 100%;
  height: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const ImageWrapper = styled.a`
  :focus {
    outline: ${props => props.href === "javascript:void(0)" ? "0" : "2px dotted gray"};
    cursor: ${props => props.href === "javascript:void(0)" ? props.theme.cursors.auto : props.theme.cursors.wait};
  }
;
  cursor: ${props => props.href === "javascript:void(0)" ? props.theme.cursors.auto : props.theme.cursors.pointer};
  display: block;
  height: auto;
  width: ${props => props.imageWidth};
`;

export default Image;