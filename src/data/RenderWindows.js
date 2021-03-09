import React from 'react';
import Window from '../components/Window/index';

function RenderWindows({windowData, setWindowData, wrapperRef}) {


    const windows = windowData.map((item, index) => {
        return <Window key={`window-${index}`} windowItem={item} wrapperRef={wrapperRef} windowData={windowData}
                       setWindowData={setWindowData}/>;
    });
    return <>{windows}</>;
}

export default RenderWindows;
