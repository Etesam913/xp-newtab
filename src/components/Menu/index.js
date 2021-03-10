import React from 'react';
import styled from 'styled-components';
import {createWindow} from './helper';
import WindowTitleText from './WindowTitleText';
import 'xp.css/dist/XP.css';

function Menu({isMenuShowing, setIsMenuShowing, windowData, setWindowData}) {
    const windowListItems = windowData.map((item, index) => {
        const windowTitle = item['windowTitle'];
        const windowId = item['id'];
        return (
            <WindowTitleText
                key={`window-title-${index}`}
                text={windowTitle}
                windowItem={item}
                id={windowId}
                disabled={item["hidden"]}
                windowData={windowData}
                setWindowData={setWindowData}
            />
        );
    });
    return (
        <MenuWrapper className='tree-view' show={isMenuShowing}>
            <div style={{overflowY: 'auto', marginBottom: '0.5rem'}}>
                <MenuHeader>Items</MenuHeader>
                <MenuSubtitle>Windows</MenuSubtitle>
                <ul>
                    {windowListItems}
                    <li>
                        <button
                            onClick={() => {
                                createWindow(windowData, setWindowData);
                            }}
                        >
                            Create Window
                        </button>
                    </li>
                </ul>
            </div>
            <CloseButton
                onClick={() => {
                    setIsMenuShowing(false);
                }}
            >
                Exit Edit Mode
            </CloseButton>
        </MenuWrapper>
    );
}

const MenuHeader = styled.h1`
  font-size: 1.25rem;
  margin: 0 0 .5rem;
  font-weight: normal;
`;

const MenuSubtitle = styled.h2`
  font-size: 1rem;
  margin: 0 0 .5rem;
  font-weight: normal;
`

/*const MenuSubtitle = styled.*/

const CloseButton = styled.button``;

const MenuWrapper = styled.ul`
  position: absolute;
  left: 0;
  z-index: 2;
  height: 100vh;
  display: ${(props) => (props.show ? 'flex !important' : 'none !important')};
  flex-direction: column;
  justify-content: space-between;
  padding: 0.35rem 0.65rem !important;
  box-sizing: border-box;
  max-width: 14rem;
  overflow-x: auto;
`;

export default Menu;
