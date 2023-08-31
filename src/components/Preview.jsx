import MemeCaption from "./MemeCaption";

function Preview({ template, captions, config }) {
  const imgSrc = template?.url

  return (
    <div className="meme">
      <div id="memeCapture">
        <img src={imgSrc} className="meme--image" />

        {captions?.map((caption) => (
          <MemeCaption
            key={caption.id}
            caption={caption}
            styles={{
              fontFamily: config.fontFamily,
              fontSize: `${config.fontSize * 3}px`,
              color: config.fontColor,
              textAlign: config.textAlign,
              WebkitTextStroke: `${config.fontStrokeWidth}px ${config.fontStrokeColor}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Preview;
