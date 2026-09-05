import Window from "../components/Window/index";

import { useStore } from "../Store";

function RenderWindows() {
  const windowData = useStore((state) => state.windowData);

  const windows = windowData.map((item, index) => {
    return <Window key={item.id} windowItem={item} windowId={index} />;
  });
  return <div>{windows}</div>;
}

export default RenderWindows;
