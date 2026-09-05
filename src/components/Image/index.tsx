import { normalizeWebsiteUrl } from "../../functions/urls";
import type { ComponentProps, ImageItem } from "../../types";
import type { StyleProps } from "../../types";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions } from "../ComponentOptions";
import { changeItemProperty, handleDelete } from "../Window/helper";
import BackButton from "../BackButton/index";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents";
import { useStore } from "../../Store";

function Image({ windowObj, windowItem }: ComponentProps<ImageItem>) {
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [isRedirectClicked, setIsRedirectClicked] = useState(false);
  const srcInput = useRef<HTMLInputElement>(null);
  const redirectInput = useRef<HTMLInputElement>(null);
  const redirectButton = useRef<HTMLButtonElement>(null);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);

  function handleOptions() {
    function setImageUrl() {
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "src",
        srcInput.current?.value.trim() ?? "",
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
        normalizeWebsiteUrl(redirectInput.current?.value),
      );
      setIsRedirectClicked(false);
    }

    function convertToImgWidth(e: React.ChangeEvent<HTMLInputElement>) {
      const sliderVal = e.target.value;
      const ratio = Number(sliderVal) / 20;
      const ratioPercentage = ratio * 100 + "%";
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "imageWidth",
        ratioPercentage,
      );
    }

    if (!isImageFocused && !isRedirectClicked) {
      return (
        <FlexContainer width={"100%"}>
          <TextAlignOptions windowItem={windowItem} windowObj={windowObj} />
          <Slider className="field-row">
            <label htmlFor="range25">Size:</label>
            <input
              data-cy={`image-size-slider-${windowItem["id"]}`}
              id="range25"
              type="range"
              min={1}
              max={20}
              defaultValue={convertToSliderWidth(windowItem["imageWidth"])}
              onChange={(e) => {
                convertToImgWidth(e);
              }}
            />
          </Slider>
          <OptionsButton
            data-cy={`set-image-url-${windowItem["id"]}`}
            onClick={() => {
              setIsRedirectClicked(true);
            }}
            width="105px"
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
            defaultValue={windowItem.href ?? ""}
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
            dataCy={`image-back-button-${windowItem["id"]}`}
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
            data-cy={`image-url-input-${windowItem["id"]}`}
            /*onBlur={handleBlur}*/
          />
          <OptionsButton
            onClick={setImageUrl}
            width="110px"
            data-cy={`set-image-url-update-${windowItem["id"]}`}
          >
            Set Image Url
          </OptionsButton>
        </FlexContainer>
      );
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLElement>) {
    if (
      event.relatedTarget === redirectInput.current ||
      event.relatedTarget === redirectButton.current
    )
      return;
    setIsImageFocused(false);
  }

  return (
    <FlexContainer
      margin="0.5rem 0"
      flexDirection={"column"}
      alignItems="center"
    >
      {isEditModeOn && (
        <FlexContainer margin={"0 0 .5rem 0"} width={"100%"}>
          {handleOptions()}
        </FlexContainer>
      )}

      <FlexContainer
        data-cy={`image-container-${windowItem["id"]}`}
        justifyContent={windowItem["justifyContent"]}
        width="100%"
      >
        <ImageWrapper
          href={
            isEditModeOn
              ? undefined
              : (normalizeWebsiteUrl(windowItem.href) ?? undefined)
          }
          onFocus={() => {
            setIsRedirectClicked(false);
            setIsImageFocused(true);
          }}
          onBlur={handleBlur}
          tabIndex={0}
          imageWidth={windowItem["imageWidth"]}
        >
          <ImageComponent
            data-cy={`image-${windowItem["id"]}`}
            src={windowItem["src"]}
            alt="Custom desktop image"
          />
        </ImageWrapper>
      </FlexContainer>
      {isEditModeOn && (
        <DeleteButton
          data-cy={`image-delete-${windowItem["id"]}`}
          margin={"0.5rem 0 0"}
          onClick={() => {
            handleDelete(
              windowData,
              setWindowData,
              windowObj,
              windowItem["id"],
            );
          }}
        >
          Delete
        </DeleteButton>
      )}
    </FlexContainer>
  );
}

const ImageComponent = styled.img<StyleProps>`
  width: 100%;
  height: 100%;

  &:focus {
    border: 1px solid blue;
  }
`;

const ImageWrapper = styled.a<StyleProps>`
  &:focus {
    outline: ${(props) => (!props.href ? "0" : "2px dotted gray")};
    cursor: ${(props) =>
      !props.href ? props.theme.cursors.auto : props.theme.cursors.wait};
  }
  cursor: ${(props) =>
    !props.href ? props.theme.cursors.auto : props.theme.cursors.pointer};
  display: block;
  height: auto;
  width: ${(props) => props.imageWidth};
`;

const Slider = styled.div<StyleProps>`
  width: 9.5rem;
  margin: 0 0.5rem;
`;

export function convertToSliderWidth(valToConvert: string) {
  const percentageNum = parseInt(valToConvert);
  const ratioNum = percentageNum / 100;
  return ratioNum * 20;
}

export default Image;
