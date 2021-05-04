import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { AppContext } from "../../Contexts";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents";
import { changeItemProperty, handleDelete } from "../Window/helper";
import BackButton from "../BackButton";

function Video({ windowObj, windowItem }) {
  const { isEditModeOn, windowData, setWindowData } = useContext(AppContext);
  const [isChangeUrlClicked, setIsChangedUrlClicked] = useState(false);
  const srcInput = useRef(null);

  function handleOptions() {
    if (isEditModeOn && !isChangeUrlClicked) {
      return (
        <FlexContainer margin={"0.5rem 0 0 0"}>
          <DeleteButton
            onClick={() => {
              handleDelete(windowData, setWindowData, windowObj, windowItem["id"]);
            }}
          >
            Delete
          </DeleteButton>
          <button
            style={{ marginLeft: "0.5rem" }}
            onClick={() => {
              setIsChangedUrlClicked(true);
            }}
          >
            Change YouTube Video Url
          </button>
        </FlexContainer>

      );
    } else if (isEditModeOn && isChangeUrlClicked) {
      return (
        <FlexContainer width={"100%"} margin={"0 0 0.5rem 0"}>
          <BackButton
            onClick={() => {
              setIsChangedUrlClicked(false);
            }}
          />
          <input
            ref={srcInput}
            style={{ width: "87%" }}
            defaultValue={windowItem["src"]}
            placeholder={"Type out YouTube video link"}
          />
          <OptionsButton onClick={setVideoSrc}> Set Video Link </OptionsButton>
        </FlexContainer>
      );

    }
  }

  function setVideoSrc() {
    const inputText = srcInput.current.value.trim();
    if (inputText !== "") {
      // Gets the youtube video id
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = inputText.match(regExp);
      const videoId = (match && match[7].length === 11) ? match[7] : false;
      const valueToInsert = "https://www.youtube.com/embed/" + videoId;
      changeItemProperty(
        windowObj,
        windowData,
        setWindowData,
        windowItem,
        "src",
        valueToInsert
      );
    }
  }

  return (
    <FlexContainer flexDirection={"column"}>
      <VideoContainer>
        <VideoComponent
          src={windowItem["src"]}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoContainer>
      {handleOptions()}
    </FlexContainer>
  );
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
`;

const VideoComponent = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

export default Video;