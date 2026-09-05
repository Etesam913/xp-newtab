import { useEffect, useState } from "react";
import { isLocalImage, readLocalImage } from "../functions/localImages";

export function useImageSource(source: string) {
  const [loaded, setLoaded] = useState({ source: "", url: "", error: "" });
  useEffect(() => {
    if (!isLocalImage(source)) return;
    let active = true;
    let url = "";
    readLocalImage(source)
      .then((blob) => {
        if (!active) return;
        url = URL.createObjectURL(blob);
        setLoaded({ source, url, error: "" });
      })
      .catch(() => {
        if (active)
          setLoaded({
            source,
            url: "",
            error:
              "The saved image could not be loaded. Choose the local image again.",
          });
      });
    return () => {
      active = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [source]);
  if (!isLocalImage(source)) return { url: source, error: "" };
  return loaded.source === source ? loaded : { url: "", error: "" };
}
