import type { StyleProps } from "../types";
import styled from "styled-components";

export const DeleteButton = styled.button<StyleProps>`
  min-width: 55px;
  padding: 0 6px;
  text-align: center;
  margin: ${(props) => props.margin};
`;

export const OptionsButton = styled.button<StyleProps>`
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0.5rem")};
  width: ${(props) => (props.width ? props.width : "117px")};
`;
