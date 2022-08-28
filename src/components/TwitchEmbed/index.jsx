import React, { useRef, useMemo, useState, useEffect } from "react";
import { TwitchEmbed as TwitchEmbedComponent } from "react-twitch-embed";
import styled from "styled-components";
import { useStore } from "../../Store";
import { FlexContainer } from "../../styles/Layout";
import { changeItemProperty } from "../Window/helper";
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

  function convertToStreamSize(e) {
    const sliderVal = e.target.value;
    const ratio = sliderVal / 20;
    const ratioPercentage = ratio * 100 + "%";
    changeItemProperty(
      componentObj,
      windowData,
      setWindowData,
      windowItem,
      "size",
      ratioPercentage
    );
  }

  return useMemo(() => {
    return (
      <TwitchContainer>
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
                />
                <button>Update Stream</button>
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
        <TwitchEmbedComponent
          channel={streamName}
          autoplay
          width={componentObj["channelName"]}
          height="100%"
          withChat
          darkMode
          muted
          onReady={handleReady}
        />
      </TwitchContainer>
    );
  }, [isEditModeOn, componentObj, windowData]);
}

const TwitchContainer = styled.div`
  height: calc(100% - 7rem);
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
