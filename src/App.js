import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Header1 } from './styles/Headers';
import Today from './components/Today';

function App() {
  return (
    <Wrapper>
      <Content
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
      >
        <Header1 margin='0.75rem'>Etesam Ansari</Header1>
        <Today />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Content = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
