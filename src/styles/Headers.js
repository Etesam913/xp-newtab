import styled from 'styled-components';

export const Header1 = styled.h1`
  margin: ${(props) => (props.margin ? props.margin : '1rem 0')};
  font-size: 1.5em;
  font-weight: normal;
`;

export const Header2 = styled.h2`
  margin: ${(props) => (props.margin ? props.margin : '0.5rem 0')};
  font-size: 2.5em;
  transition: color 150ms;
`;

export const Header3 = styled.h3`
  margin: ${(props) => (props.margin ? props.margin : '0.5 0rem')};
  font-size: 2em;
  transition: color 150ms;
`;
