import React, { useContext } from "react";
import { AppContext } from "../Contexts";
import Icon from "../components/Icon/index";

function RenderIcons() {
  const { iconData } = useContext(AppContext);
  const icons = iconData.map((icon, index) => {
    return (
      <Icon
        iconItem={icon}
        key={"icon-" + index}
        id={"icon-" + index}
      />
    );
  });

  return (
    <div>{icons}</div>
  );
}

export default RenderIcons;