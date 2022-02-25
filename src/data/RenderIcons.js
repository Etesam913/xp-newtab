import React from "react";
import Icon from "../components/Icon/index";
import { useStore } from "../Store";

function RenderIcons() {
  const iconData = useStore((state) => state.iconData);
  const icons = iconData.map((icon, index) => {
    return <Icon iconItem={icon} key={"icon-" + index} id={"icon-" + index} />;
  });

  return <div>{icons}</div>;
}

export default RenderIcons;
