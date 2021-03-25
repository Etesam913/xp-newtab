import styled, {css} from 'styled-components';

export const TopRight = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
`;

export const FlexContainer = styled.div`
  display: flex;
  padding: ${props=>props.padding};
  margin: ${props=>props.margin};
  cursor: ${props=>props.cursor};
  width: ${props=>props.width};
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : "center"};
  align-items: ${props => props.alignItems ? props.alignItems : "center"};
  ${props=>props.tablet && css `
    @media only screen and (max-width: 768px){
     flex-direction: column;
      align-items: flex-start !important;
    }
  `}
`;