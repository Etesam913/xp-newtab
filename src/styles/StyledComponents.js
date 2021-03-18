import styled from "styled-components";

export const DeleteButton = styled.button`
  min-width: 55px;
  padding: 0 6px;
  text-align: center;
  margin: ${props => props.margin};
`;

export const OptionsButton = styled.button`
  margin: ${props => props.margin ? props.margin : "0 0 0 0.5rem"};
  width: ${props => props.width ? props.width : "117px"};
`;
