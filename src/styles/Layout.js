import styled from 'styled-components';

export const ItemGrid = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  @media only screen and (min-width: 500px) {
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
  }
`;

export const TopRight = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;