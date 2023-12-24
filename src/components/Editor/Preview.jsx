import { useMemo } from "react";
import { twMerge as tm } from "tailwind-merge";
import MemeCaption from "./MemeCaption";

export default function Preview({ template, captions, config, fetchError }) {
  const imgSrc = useMemo(() => {
    return fetchError ? "/img/standby.jpeg" : template?.url;
  }
  , [template, fetchError]);

  const styles = {
    fontFamily: config.fontFamily,
    fontSize: `${config.fontSize * 3}px`,
    color: config.fontColor,
    textAlign: config.textAlign,
    WebkitTextStroke: `${config.fontStrokeWidth}px ${config.fontStrokeColor}`,
  };

  return (
    <div id="memeCapture" className={tm("relative m-auto overflow-hidden", fetchError ? "w-auto" : "w-full")}>
      <img src={imgSrc} className="w-full lg:m-0" loading="lazy" />

      {captions?.map((caption) => (
        <MemeCaption key={caption.id} caption={caption} styles={styles} />
      ))}
    </div>
  );
}
