import React, { useRef } from "react";
import styled, { withTheme } from "styled-components";
import Draggable from "react-draggable";
import { setDataProperty } from "../Window/helper";
import { deleteDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";

function Index({ iconItem, theme }) {
  const iconData = useStore((state) => state.iconData);
  const setIconData = useStore((state) => state.setIconData);
  const iconRef = useRef(null);

  const settingsData = useStore((state) => state.settingsData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  function handleDoubleClick() {
    if (!isEditModeOn) {
      document.body.style.cursor = theme.cursors.wait;
      window.location = iconItem["redirect"];
    }
  }

  return (
    <Draggable
      bounds="#wrapper"
      nodeRef={iconRef}
      grid={
        parseInt(settingsData["draggingGrid"]) !== 0 && [
          parseInt(settingsData["draggingGrid"]),
          parseInt(settingsData["draggingGrid"]),
        ]
      }
      position={{ x: iconItem["xCoord"], y: iconItem["yCoord"] }}
      onStop={() => {
        setDataProperty(iconData, setIconData, iconItem, "position", iconRef);
      }}
    >
      <IconWrapper ref={iconRef} tabIndex={0} onDoubleClick={handleDoubleClick}>
        {isEditModeOn ? (
          <header>
            <IconText>Img Url</IconText>
            <IconInput
              defaultValue={iconItem["src"]}
              onBlur={(e) => {
                setDataProperty(
                  iconData,
                  setIconData,
                  iconItem,
                  "src",
                  e.target.value
                );
              }}
            />
          </header>
        ) : (
          <IconImg src={iconItem["src"]} />
        )}

        {isEditModeOn ? (
          <section>
            <IconText>Icon Title</IconText>
            <IconTextArea
              defaultValue={iconItem["title"]}
              onBlur={(e) => {
                setDataProperty(
                  iconData,
                  setIconData,
                  iconItem,
                  "title",
                  e.target.value
                );
              }}
            />
          </section>
        ) : (
          <IconText> {iconItem["title"]} </IconText>
        )}
        {isEditModeOn && (
          <footer>
            <section>
              <IconText>Redirect Url</IconText>
              <IconInput
                defaultValue={iconItem["redirect"]}
                onBlur={(e) => {
                  setDataProperty(
                    iconData,
                    setIconData,
                    iconItem,
                    "redirect",
                    e.target.value
                  );
                }}
              />
            </section>
            <DeleteRow>
              <button
                onClick={() => {
                  deleteDataItem(iconData, setIconData, iconItem);
                }}
              >
                Delete Icon
              </button>
            </DeleteRow>
          </footer>
        )}
      </IconWrapper>
    </Draggable>
  );
}

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 1rem;
  top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  :focus {
    outline: 1px dotted black;
  }
`;

const IconInput = styled.input`
  margin-top: 0.25rem;
`;

const IconTextArea = styled.textarea`
  text-align: center;
  margin-top: 0.25rem;
  resize: none;
`;

const IconImg = styled.img`
  height: 48px;
  width: auto;
  pointer-events: none;
`;

const DeleteRow = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;
`;

const IconText = styled.p`
  font-family: ${(props) => props.theme.fonts.primary};
  margin-top: 0.35rem;
  color: white;
  text-align: center;
  width: auto;
  max-width: 100px;
  max-height: 43px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  text-shadow: 1.25px 1.2px 1px #000000;
`;

export default withTheme(Index);
