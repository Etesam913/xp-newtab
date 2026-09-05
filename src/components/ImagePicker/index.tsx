import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useStore } from "../../Store";
import { TitleBarButton } from "../WindowTitleBar";
import { LocalImagePicker } from "../LocalImagePicker";
import { imageUrlInput, isLocalImage } from "../../functions/localImages";
import { useImageSource } from "../../hooks/useImageSource";

export function ImagePicker({
  source,
  onSelect,
  label = "Change image",
  context,
}: {
  source: string;
  onSelect: (source: string) => void;
  label?: string;
  context: "icon" | "desktop" | "background";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        {label}…
      </button>
      {open &&
        createPortal(
          <ImageDialog
            key={source}
            source={source}
            onSelect={onSelect}
            context={context}
            onClose={() => setOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}

function ImageDialog({
  source,
  onSelect,
  context,
  onClose,
}: {
  source: string;
  onSelect: (source: string) => void;
  context: "icon" | "desktop" | "background";
  onClose: () => void;
}) {
  const windowsOS = useStore((state) => state.settingsData.windowsOS);
  const dialog = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [url, setUrl] = useState(imageUrlInput(source));
  const image = useImageSource(source);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  function select(value: string) {
    onSelect(value);
    onClose();
  }
  return (
    <PickerDialog
      ref={dialog}
      onMouseDown={(event) => event.stopPropagation()}
      className="window active"
      aria-label={`Change ${context} image`}
      onCancel={onClose}
      onClose={onClose}
    >
      <div className="title-bar">
        <div className="title-bar-text">Change {context} image</div>
        <div className="title-bar-controls">
          <TitleBarButton
            windowsOS={windowsOS}
            type="button"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
      </div>
      <div className="window-body">
        <Preview $size={context === "icon" ? 128 : 64}>
          {image.url ? (
            <img src={image.url} alt="Current image" />
          ) : (
            <span>No image</span>
          )}
          <div>
            <strong>Current image</strong>
            <p>
              {isLocalImage(source)
                ? "Saved on this device"
                : source
                  ? "From a URL"
                  : "None selected"}
            </p>
          </div>
        </Preview>
        <Choices aria-label="Image source">
          <div>
            <input
              id="image-source-file"
              type="radio"
              name="image-source"
              checked={mode === "file"}
              onChange={() => setMode("file")}
            />
            <label htmlFor="image-source-file">Upload file</label>
          </div>
          <div>
            <input
              id="image-source-web"
              type="radio"
              name="image-source"
              checked={mode === "url"}
              onChange={() => setMode("url")}
            />
            <label htmlFor="image-source-web">Image URL</label>
          </div>
        </Choices>
        <SourcePanel>
          {mode === "file" ? (
            <>
              <p>Choose an image from your device.</p>
              <LocalImagePicker
                key={source}
                label={`Choose local ${context} image`}
                onSelect={select}
              />
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (url.trim()) select(url.trim());
              }}
            >
              <label htmlFor="image-source-url">Image URL</label>
              <input
                autoFocus
                id="image-source-url"
                aria-label={
                  context === "icon"
                    ? "Icon image URL"
                    : context === "background"
                      ? "Background image URL"
                      : "Desktop image URL"
                }
                value={url}
                placeholder="https://example.com/image.jpg"
                onChange={(event) => setUrl(event.target.value)}
              />
              <Help>Paste a direct link to an image.</Help>
              <button type="submit" disabled={!url.trim()}>
                Use image
              </button>
            </form>
          )}
        </SourcePanel>
        <Footer>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </Footer>
      </div>
    </PickerDialog>
  );
}

const PickerDialog = styled.dialog`
  width: min(380px, calc(100vw - 32px));
  padding: 3px;
  color: #222;
  max-height: calc(100vh - 32px);
  overflow: auto;
  border: none;
  &::backdrop {
    background: rgba(0, 0, 0, 0.35);
  }
  .window-body {
    margin: 12px;
  }
`;
const Preview = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  img,
  > span {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    flex-shrink: 0;
    object-fit: contain;
    background: white;
    border: 1px solid #aaa;
  }
  p {
    margin-top: 4px;
    color: #555;
  }
`;
const Choices = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 12px;
  > div {
    display: flex;
    align-items: center;
  }
  label {
    white-space: nowrap;
  }
  input[type="radio"] + label::before,
  input[type="radio"]:checked + label::after {
    top: 50%;
    transform: translateY(-50%);
  }
`;
const SourcePanel = styled.div`
  padding: 12px;
  border: 1px solid #aaa;
  background: rgba(255, 255, 255, 0.5);
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  input[type="text"],
  input:not([type]) {
    width: 100%;
    min-width: 0;
  }
  form button {
    align-self: flex-start;
  }
`;
const Help = styled.p`
  margin-top: 8px !important;
  color: #555;
  font-size: 11px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
