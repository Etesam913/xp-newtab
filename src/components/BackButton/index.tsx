import type { StyleProps } from "../../types";
import styled from "styled-components";

function BackButton({
  margin,
  onClick,
  dataCy,
}: {
  margin?: string;
  onClick?: () => void;
  dataCy?: string;
}) {
  function handleClick() {
    if (onClick) onClick();
  }

  return (
    <ImageButton
      margin={margin}
      onClick={handleClick}
      data-cy={dataCy}
      aria-label="Back"
      type="button"
    >
      <BackImage alt={"image of back button"} src={"./assets/icons/back.png"} />
    </ImageButton>
  );
}

const BackImage = styled.img<StyleProps>`
  height: 24px;
  width: 24px;
`;

const ImageButton = styled.button<StyleProps>`
  background: transparent !important;
  border: 0;
  box-shadow: none !important;
  min-width: 24px !important;
  min-height: 24px;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: ${(props) => (props.margin ? props.margin : "0 0.25rem 0 0")};
`;

export default BackButton;
