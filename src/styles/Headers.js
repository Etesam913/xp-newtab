import styled from 'styled-components';
import {motion} from 'framer-motion'

export const Header1 = styled(motion.h1)`
  margin: ${props=>props.margin ? props.margin : "1rem"};
  font-size: 3.25em;
`;

export const Header2 = styled(motion.h2)`
  margin: ${props=>props.margin ? props.margin : "0.5rem"};
  font-size: 2.5em;
`;