import styled, {css} from 'styled-components';

export const TopRight = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const FlewContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'row'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : "center"};
  align-items: ${props => props.alignItems ? props.alignItems : "center"};
  ${props=>props.tablet && css `
    @media only screen and (max-width: 768px){
     flex-direction: column;
    }
  `}
`;