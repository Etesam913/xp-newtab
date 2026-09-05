import { useEffect, useState } from "react";
import type { WindowsOS } from "../types";

const styles = [
  () => import("xp.css/dist/XP.css?inline"),
  () => import("98.css/dist/98.css?inline"),
  () => import("7.css/dist/7.css?inline"),
] as const;
export function ThemeStyles({ windowsOS }: { windowsOS: WindowsOS }) {
  const [css, setCss] = useState("");
  useEffect(() => {
    let active = true;
    void styles[windowsOS]().then((module) => {
      if (active) setCss(module.default);
    });
    return () => {
      active = false;
    };
  }, [windowsOS]);
  return <style>{css}</style>;
}
