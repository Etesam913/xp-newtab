import styled, {css} from 'styled-components';

export const TopRight = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  margin: ${props=>props.margin};
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