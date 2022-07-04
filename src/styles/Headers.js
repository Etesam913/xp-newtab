import styled from "styled-components";

export const Header1 = styled.h1`
  margin: ${(props) => (props.margin ? props.margin : "1rem 0")};
  font-size: 1.5em;
  font-weight: normal;
  width: ${(props) => props.width};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
`;

export const Header2 = styled.h2`
  margin: ${(props) => (props.margin ? props.margin : "0.5rem 0")};
  font-size: 2.5em;
  transition: color 150ms;
`;

export const Header3 = styled.h3`
  margin: ${(props) => (props.margin ? props.margin : "0.5 0rem")};
  font-size: 2em;
  transition: color 150ms;
`;

export const Header4 = styled.h4`
  margin: ${(props) => (props.margin ? props.margin : "0.5 0rem")};
  font-size: 1.5em;
  transition: color 150ms;
`;
export const Header5 = styled.h5`
  margin: ${(props) => (props.margin ? props.margin : "0.5 0rem")};
  font-size: 1.15em;
  transition: color 150ms;
  font-weight: normal;
`;
