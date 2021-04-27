import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions } from "../ComponentOptions";
import { AppContext } from "../../Contexts";
import { changeItemProperty, handleDelete } from "../Window/helper";
import BackButton from "../BackButton/index";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents";

function Image({ windowItem, item }) {
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(175);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [isRedirectClicked, setIsRedirectClicked] = useState(false);
  const srcInput = useRef(null);
  const redirectInput = useRef(null);
  const redirectButton = useRef(null);

  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);

  function onResize(e, {size }) {
    setImageWidth(size.width);
    setImageHeight(size.height);
  }

  function handleOptions() {
    function setImageUrl() {
      if (srcInput.current.value.trim() !== "") {
        changeItemProperty(
          windowItem,
          windowData,
          setWindowData,
          item,
          "src",
          srcInput.current.value.trim()
        );
        setIsImageFocused(false);
      }
    }

    function setRedirectUrl() {
      if (redirectInput.current.value.trim() !== "") {
        changeItemProperty(
          windowItem,
          windowData,
          setWindowData,
          item,
          "href",
          redirectInput.current.value
        );
        setIsRedirectClicked(false);
        console.log(imageWidth);
        console.log(imageHeight);
      }
    }


    if (!isImageFocused && !isRedirectClicked) {
      return (
        <FlexContainer width={"100%"}>
          <TextAlignOptions item={item} windowItem={windowItem} />
          <OptionsButton>Fit Size To Window</OptionsButton>
          <OptionsButton
            width={"125px"}
            onClick={() => {
              setIsRedirectClicked(true);
            }}
          >
            Redirect to Website
          </OptionsButton>
        </FlexContainer>
      );
    } else if (isImageFocused) {
      return (
        <FlexContainer width={"100%"}>
          <input ref={srcInput} style={{ width: "100%" }} placeholder={"Enter image url"}
                 defaultValue={item["src"]} />
          <OptionsButton
            onClick={setImageUrl}
          >
            Set Image Url
          </OptionsButton>
        </FlexContainer>
      );
    } else if (isRedirectClicked) {
      return (
        <FlexContainer width={"100%"}>
          <BackButton
            margin={"0 0.25rem 0 0"}
            onClick={() => {
              setIsRedirectClicked(false);
            }}
          />
          <input ref={redirectInput} style={{ width: "87%" }}
                 placeholder={"Enter website url to redirect to on image click"}
                 defaultValue={item["href"] !== null ? item["href"] : ""}
                 onBlur={handleBlur}
          />
          <OptionsButton
            width={"125px"}
            ref={redirectButton}
            onClick={setRedirectUrl}
          >
            Set Redirect Url
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
      if (srcInput && srcInput.current !== document.activeElement) {
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

      <FlexContainer justifyContent={item["justifyContent"]}>
        <ResizableBox
          width={imageWidth}
          height={imageHeight}
          onResize={onResize}
          maxConstraints={[350, 500]}
          lockAspectRatio
          resizeHandles={isEditModeOn ? item["justifyContent"] === "flex-end" ? ["sw"] : ["se"] : []}
        >
          <ImageWrapper
            href={isEditModeOn ? null : item["href"]}
            onFocus={() => {
              setIsRedirectClicked(false);
              setIsImageFocused(true);
            }}
            onBlur={() => {
              handleBlur();
            }}
            tabIndex={0}
            width={imageWidth}
            height={imageHeight}>
            <ImageComponent src={item["src"]} />
          </ImageWrapper>

        </ResizableBox>
      </FlexContainer>
      {isEditModeOn &&
      <DeleteButton
        margin={"0.5rem 0 0"}
        onClick={() => {
          handleDelete(windowData, setWindowData, windowItem, item["id"]);
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
    outline: 2px dotted gray;
  }
;
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export default Image;