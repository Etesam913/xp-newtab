import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

function Window({width, wrapperRef, title}) {
    const windowRef = useRef(null);
    const [canDrag, setCanDrag] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <WindowContainer
            ref={windowRef}
            width={width}
            className='window'
            drag={canDrag}
            onDragStart={() => {
                setIsDragging(true);
            }}
            onDragEnd={() => {
                setIsDragging(false);
            }}
            dragConstraints={wrapperRef}
            dragElastic={0}
            dragMomentum={0}
        >
            <motion.div
                className='title-bar'
                onHoverStart={() => {
                    setCanDrag(true);
                }}
                onHoverEnd={() => {
                    !isDragging && setCanDrag(false);
                }}
            >
                <div className='title-bar-text'>
                    {title ? title : 'Insert Title Here'}
                </div>
                <div className='title-bar-controls'>
                    <button aria-label='Close'/>
                </div>
            </motion.div>

            <div className='window-body'>
                <p style={{textAlign: 'center'}}>Current count</p>
                <div className='field-row' style={{justifyContent: 'center'}}></div>
            </div>
        </WindowContainer>
    );
}

const WindowContainer = styled(motion.div)`
  width: ${(props) => (props.width ? props.width : '18.75rem')};
  min-width: 15rem;
  min-height: 4rem;
  resize: both;
  font-family: 'Pixelated MS Sans Serif', 'Arial';
  overflow: auto;
  position: absolute;
`;

export default Window;
