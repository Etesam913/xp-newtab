import Icon from "../components/Icon/index";
import { useStore } from "../Store";

function RenderIcons() {
  const iconData = useStore((state) => state.iconData);
  const icons = iconData.map((icon) => {
    return <Icon iconItem={icon} key={icon.id} />;
  });

  return <div>{icons}</div>;
}

export default RenderIcons;
