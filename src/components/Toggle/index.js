import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

function Toggle({ stateVal, setStateVal, disable }) {

  return (
    <ToggleWrapper
      on={stateVal}
      onClick={() => {
        setStateVal && setStateVal(!stateVal);
      }}>
      <ToggleCircle layout transition={spring} />
    </ToggleWrapper>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};


const ToggleWrapper = styled(motion.div)`
  width: 34px;
  height: 20px;
  border-radius: 100px;
  padding: 0 3px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  ${props => props.on && css`
    background-color: #22cc88;
    justify-content: flex-end;
  `}

  ${props => !props.on && css`
    background-color: #dddddd;
    justify-content: flex-start;
  `};

`;

const ToggleCircle = styled(motion.div)`
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
`;


export default Toggle;