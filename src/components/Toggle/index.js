import React from "react";
import styled, { css } from "styled-components";

function Toggle({ stateVal, toggleStateVal }) {
  return (
    <ToggleWrapper on={stateVal} onClick={toggleStateVal}>
      <ToggleCircle />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  width: 34px;
  height: 20px;
  border-radius: 100px;
  padding: 0 3px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.on &&
    css`
      background-color: #22cc88;
      justify-content: flex-end;
    `}

  ${(props) =>
    !props.on &&
    css`
      background-color: #dddddd;
      justify-content: flex-start;
    `};
`;

const ToggleCircle = styled.div`
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
`;

export default Toggle;
