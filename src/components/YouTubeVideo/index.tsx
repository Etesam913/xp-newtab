import { getYouTubeEmbedUrl, getYouTubeVideoId } from "../../functions/urls";
import type { ComponentProps, VideoItem } from "../../types";
import type { StyleProps } from "../../types";
import { useRef, useState } from "react";
import styled from "styled-components";
import { FlexContainer } from "../../styles/Layout";
import { DeleteButton, OptionsButton } from "../../styles/StyledComponents";
import { changeItemProperty, handleDelete } from "../Window/helper";
import BackButton from "../BackButton";
import { useStore } from "../../Store";

function YouTubeVideo({ windowObj, windowItem }: ComponentProps<VideoItem>) {
  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const [isChangeUrlClicked, setIsChangedUrlClicked] = useState(false);
  const [error, setError] = useState("");
  const embedUrl = getYouTubeEmbedUrl(windowItem.src);
  const videoId = getYouTubeVideoId(windowItem.src);
  const srcInput = useRef<HTMLInputElement>(null);
  const isEditModeOn = useStore((store) => store.isEditModeOn);

  function handleOptions() {
    if (isEditModeOn && !isChangeUrlClicked) {
      return (
        <FlexContainer margin={"0 0 0.5rem 0"}>
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
            aria-label="YouTube video URL"
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
    const embed = getYouTubeEmbedUrl(srcInput.current?.value ?? "");
    if (!embed) {
      setError("Enter a valid YouTube video link.");
      return;
    }
    changeItemProperty(
      windowObj,
      windowData,
      setWindowData,
      windowItem,
      "src",
      embed,
    );
    setError("");
    setIsChangedUrlClicked(false);
  }

  return (
    <FlexContainer flexDirection={"column"}>
      {handleOptions()}
      {error && <p role="alert">{error}</p>}
      {embedUrl ? (
        <VideoContainer>
          <VideoComponent
            src={embedUrl}
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      ) : (
        <p>Set a valid YouTube video link to load the player.</p>
      )}
      {videoId && (
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener"
        >
          Open on YouTube
        </a>
      )}
      <FlexContainer margin="0.5rem 0 0">
        {isEditModeOn && (
          <DeleteButton
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
    </FlexContainer>
  );
}

const VideoContainer = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 200px;
`;

const VideoComponent = styled.iframe<StyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

export default YouTubeVideo;
