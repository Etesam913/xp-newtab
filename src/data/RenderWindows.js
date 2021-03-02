import React from 'react';
import Window from '../components/Window/index';

function RenderWindows({ windowData, wrapperRef }) {
  const windows = windowData.map((item, index) => {
    const windowTitle = item['windowTitle'];
    return <Window key={`window-${index}`} title={windowTitle} wrapperRef={wrapperRef} />;
  });
  return <div>{windows}</div>;
}
export default RenderWindows;
