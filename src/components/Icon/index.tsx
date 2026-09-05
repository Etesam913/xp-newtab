import { ImagePicker } from "../ImagePicker";
import { useImageSource } from "../../hooks/useImageSource";
import { theme as appTheme } from "../../styles/theme";
import { normalizeWebsiteUrl } from "../../functions/urls";
import type { DesktopIcon } from "../../types";
import type { StyleProps } from "../../types";
import { useRef } from "react";
import styled, { withTheme } from "styled-components";
import Draggable from "react-draggable";
import { setDataProperty } from "../Window/helper";
import { deleteDataItem } from "../../functions/helpers";
import { useStore } from "../../Store";

function Index({
  iconItem,
  theme,
}: {
  iconItem: DesktopIcon;
  theme: typeof appTheme;
}) {
  const image = useImageSource(iconItem.src);
  const iconData = useStore((state) => state.iconData);
  const setIconData = useStore((state) => state.setIconData);
  const iconRef = useRef<HTMLDivElement>(null);

  const settingsData = useStore((state) => state.settingsData);
  const isEditModeOn = useStore((store) => store.isEditModeOn);
  function handleDoubleClick() {
    if (!isEditModeOn) {
      document.body.style.cursor = theme.cursors.wait;
      const destination = normalizeWebsiteUrl(iconItem.redirect);
      if (destination) window.location.assign(destination);
      else document.body.style.cursor = theme.cursors.auto;
    }
  }

  return (
    <Draggable
      bounds="#wrapper"
      cancel="input,textarea,button"
      nodeRef={iconRef}
      grid={
        parseInt(settingsData["draggingGrid"]) !== 0
          ? [
              parseInt(settingsData["draggingGrid"]),
              parseInt(settingsData["draggingGrid"]),
            ]
          : undefined
      }
      position={{ x: iconItem["xCoord"], y: iconItem["yCoord"] }}
      onStop={() => {
        setDataProperty(iconData, setIconData, iconItem, "position", iconRef);
      }}
    >
      <IconWrapper
        $editing={isEditModeOn}
        ref={iconRef}
        tabIndex={0}
        onDoubleClick={handleDoubleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.target === event.currentTarget)
            handleDoubleClick();
        }}
        data-cy={`icon-${iconItem.id}`}
      >
        <IconImg src={image.url || undefined} alt="" />
        {isEditModeOn && (
          <ImagePicker
            context="icon"
            source={iconItem.src}
            onSelect={(source) => {
              setDataProperty(iconData, setIconData, iconItem, "src", source);
            }}
          />
        )}

        {image.error && <p role="alert">{image.error}</p>}
        {isEditModeOn ? (
          <section>
            <IconText>Icon title</IconText>
            <IconTextArea
              aria-label="Icon title"
              defaultValue={iconItem["title"]}
              onBlur={(e) => {
                setDataProperty(
                  iconData,
                  setIconData,
                  iconItem,
                  "title",
                  e.target.value,
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
              <IconText>Opens this website</IconText>
              <IconInput
                aria-label="Icon destination URL"
                defaultValue={iconItem["redirect"]}
                onBlur={(e) => {
                  setDataProperty(
                    iconData,
                    setIconData,
                    iconItem,
                    "redirect",
                    e.target.value,
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

const IconWrapper = styled.div<StyleProps & { $editing: boolean }>`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $editing }) =>
    $editing &&
    `
    width: 190px;
    box-sizing: border-box;
    padding: 12px;
    gap: 8px;
    background: #ece9d8;
    border: 1px solid #888;
    border-radius: 3px;
    box-shadow: 2px 2px 6px #0004;
    section, footer { width: 100%; }
    input, textarea { width: 100%; box-sizing: border-box; }
    p { color: #222; text-shadow: none; text-align: left; max-width: none; }
  `}
  &:focus {
    outline: 1px dotted black;
  }
`;

const IconInput = styled.input<StyleProps>`
  margin-top: 0.25rem;
`;

const IconTextArea = styled.textarea<StyleProps>`
  text-align: center;
  margin-top: 0.25rem;
  resize: none;
`;

const IconImg = styled.img<StyleProps>`
  height: 64px;
  width: 64px;
  object-fit: contain;
  pointer-events: none;
`;

const DeleteRow = styled.section<StyleProps>`
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;
`;

const IconText = styled.p<StyleProps>`
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
