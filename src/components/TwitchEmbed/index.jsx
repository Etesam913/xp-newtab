import React, { useRef, useMemo, useState, useEffect } from "react";
import { TwitchEmbed as TwitchEmbedComponent } from "react-twitch-embed";
import styled from "styled-components";
import { useStore } from "../../Store";
import { FlexContainer } from "../../styles/Layout";
import { changeItemProperty, handleDelete } from "../Window/helper";
import { convertToSliderWidth } from "../Image";

function TwitchEmbed({ componentObj, windowItem }) {
  const embed = useRef();
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  const handleReady = (e) => {
    embed.current = e;
  };

  const windowData = useStore((state) => state.windowData);
  const setWindowData = useStore((state) => state.setWindowData);

  const [streamName, setStreamName] = useState(componentObj["channelName"]);
  const [streamSize, setStreamSize] = useState(componentObj["size"]);
  const [updatedStreamName, setUpdatedStreamName] = useState(
    componentObj["channelName"]
  );

  useEffect(() => {
    changeItemProperty(
      windowItem,
      windowData,
      setWindowData,
      componentObj,
      "size",
      streamSize
    );
  }, [streamSize]);

  function handleStreamNameSubmit() {
    if (streamName !== "") {
      setUpdatedStreamName(streamName);
      changeItemProperty(
        windowItem,
        windowData,
        setWindowData,
        componentObj,
        "channelName",
        streamName
      );
    }
  }

  function convertToStreamSize(e) {
    const sliderVal = e.target.value;
    const ratio = sliderVal / 20;
    const ratioPercentage = ratio * 100 + "%";
    setStreamSize(ratioPercentage);
  }

  const twitch = useMemo(() => {
    return (
      <TwitchEmbedComponent
        channel={updatedStreamName}
        autoplay
        width="100%"
        height="100%"
        withChat
        darkMode
        muted
        onReady={handleReady}
      />
    );
  }, [updatedStreamName]);

  return (
    <ComponentWrapper>
      {isEditModeOn && (
        <FlexContainer
          width="100%"
          margin="0.5rem 0"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <OptionItem>
            <label htmlFor="channel-input">Twitch Channel Name:</label>
            <FlexContainer flexWrap="wrap" justifyContent="left">
              <StreamNameInput
                id="channel-input"
                type="text"
                placeholder="Put twitch chanel name here..."
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
              />
              <button onClick={handleStreamNameSubmit}>Update Stream</button>
            </FlexContainer>
          </OptionItem>
          <OptionItem>
            <label htmlFor="stream-size">Stream Size:</label>
            <StreamSizeSlider
              id="stream-size"
              type="range"
              min={2}
              max={20}
              defaultValue={convertToSliderWidth(componentObj["size"])}
              onChange={convertToStreamSize}
            />
          </OptionItem>
        </FlexContainer>
      )}
      <TwitchContainer width={streamSize}>{twitch}</TwitchContainer>
      {isEditModeOn && (
        <FlexContainer margin="0.5rem">
          <button
            onClick={() => {
              handleDelete(
                windowData,
                setWindowData,
                windowItem,
                componentObj["id"]
              );
            }}
          >
            Delete
          </button>
        </FlexContainer>
      )}
    </ComponentWrapper>
  );
}

const ComponentWrapper = styled.div`
  height: calc(100% - 7rem);
`;

const TwitchContainer = styled.div`
  width: ${(props) => props.width};
  height: 100%;
`;

const OptionItem = styled.span`
  width: 50%;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;
const StreamNameInput = styled.input`
  flex: 1;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const StreamSizeSlider = styled.input`
  margin: 0.5rem 0;
`;

export default TwitchEmbed;
