import { ImagePicker } from "../ImagePicker";
import { useImageSource } from "../../hooks/useImageSource";
import { normalizeWebsiteUrl } from "../../functions/urls";
import type { ComponentProps, ImageItem } from "../../types";
import type { StyleProps } from "../../types";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { TextAlignOptions } from "../ComponentOptions";
import { changeItemProperty, handleDelete } from "../Window/helper";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents";
import { useStore } from "../../Store";

function Image({ windowObj, windowItem }: ComponentProps<ImageItem>) {
  const image = useImageSource(windowItem.src);
  const [isImageFocused, setIsImageFocused] = useState(false);
  const redirectInput = useRef<HTMLInputElement>(null);
  const redirectButton = useRef<HTMLButtonElement>(null);

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);

  function handleOptions() {
    function setRedirectUrl() {
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "href",
        normalizeWebsiteUrl(redirectInput.current?.value),
      );
      setIsImageFocused(false);
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

    if (!isImageFocused) {
      return (
        <FlexContainer width={"100%"} flexWrap="wrap">
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
          <ImagePicker
            context="desktop"
            source={windowItem.src}
            onSelect={(source) => {
              changeItemProperty(
                windowObj,
                windowData,
                setWindowData,
                windowItem,
                "src",
                source,
              );
            }}
          />
        </FlexContainer>
      );
    } else if (isImageFocused) {
      return (
        <FlexContainer width={"100%"} flexWrap="wrap">
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

      {image.error && <p role="alert">{image.error}</p>}
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
            setIsImageFocused(true);
          }}
          onBlur={handleBlur}
          tabIndex={0}
          imageWidth={windowItem["imageWidth"]}
        >
          <ImageComponent
            data-cy={`image-${windowItem["id"]}`}
            src={image.url || undefined}
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
