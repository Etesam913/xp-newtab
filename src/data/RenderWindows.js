import React from 'react';
import Window from '../components/Window/index';

function RenderWindows({windowData, setWindowData, isMenuShowing}) {
    const windows = windowData.map((item, index) => {
        return (
            <Window
                key={`window-${index}`}
                windowItem={item}
                isMenuShowing={isMenuShowing}
                windowData={windowData}
                setWindowData={setWindowData}
                windowId={index}
            />
        );
    });
    return <>{windows}</>;
}

export default RenderWindows;
