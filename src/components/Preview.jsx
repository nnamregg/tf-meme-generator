import MemeCaption from "./MemeCaption";

export default function Preview({ template, captions, config }) {
  const imgSrc = template?.url;
  const styles = {
    fontFamily: config.fontFamily,
    fontSize: `${config.fontSize * 3}px`,
    color: config.fontColor,
    textAlign: config.textAlign,
    WebkitTextStroke: `${config.fontStrokeWidth}px ${config.fontStrokeColor}`,
  };

  return (
    <div id="memeCapture" className="relative m-auto w-full overflow-hidden">
      <img src={imgSrc} className="w-full lg:m-0" loading="lazy" />

      {captions?.map((caption) => (
        <MemeCaption key={caption.id} caption={caption} styles={styles} />
      ))}
    </div>
  );
}
