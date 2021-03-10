import React, {useContext} from 'react';
import Window from '../components/Window/index';
import {AppContext} from "../Contexts";

function RenderWindows() {
    const {windowData} = useContext(AppContext)
    const windows = windowData.map((item, index) => {
        return (
            <Window
                key={`window-${index}`}
                windowItem={item}
                windowId={index}
            />
        );
    });
    return <>{windows}</>;
}

export default RenderWindows;
