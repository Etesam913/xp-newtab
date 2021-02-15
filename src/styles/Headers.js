import styled from 'styled-components';

export const Header1 = styled.h1`
  margin: ${(props) => (props.margin ? props.margin : '1rem')};
  font-size: 3.25em;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
  transition: color 150ms;
`;

export const Header2 = styled.h2`
  margin: ${(props) => (props.margin ? props.margin : '0.5rem')};
  font-size: 2.5em;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
  transition: color 150ms;
`;

export const Header3 = styled.h3`
  margin: ${(props) => (props.margin ? props.margin : '0.5rem')};
  font-size: 2em;
  text-align: center;
  color: ${(props) => props.theme.fontColor};
  transition: color 150ms;
`;
