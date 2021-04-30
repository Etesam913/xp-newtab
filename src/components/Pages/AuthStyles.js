import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Window = styled.div`
  width: 37rem;
  height: auto;
  font-family: ${props => props.theme.fonts.primary};
  z-index: 6;
  @media only screen and (max-width: 768px) {
    width: 80% !important;
  }
`;

export const InputLabel = styled.label`
  font-size: 1.25em;
  margin: 0.35rem 0;
`;

export const AuthSection = styled.section`
  margin: 0.75rem 0;
  :first-child{
    margin-top: 0;
  }
  :last-child{
    margin-bottom: 0;
  }
`;

export const AuthButton = styled.button`
  margin: 0.35rem 0;
`;

export const AuthInput = styled.input`
  width: min(15rem, 100%);
  height: 1.5rem;
  font-size: 1.1em;
  padding: 0.2rem 0.35rem !important;
  border-radius: 2px !important;
  border: 1.5px solid #646464 !important;

  :focus {
    outline: none;
    border: 2px solid #4D90FE !important;
  }
`;