import { useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import Moveable from "react-moveable";

function MemeCaption({ caption, styles }) {
  const [showControls, setShowControls] = useState(false);

  const captionClasses =
    "box-content absolute top-0 left-0 p-2 leading-none break-words cursor-move select-none bg-none";

  return (
    <>
      <h2
        className={tm(
          captionClasses,
          showControls && "bg-memeplex-800/30 backdrop-blur-md",
        )}
        id={`caption-${caption.id}`}
        style={styles}
        onClick={(e) => setShowControls(!showControls)}
        // onMouseDown={(e) => setShowControls(true)}
        // onMouseUp={(e) => setShowControls(false)}
        // onMouseEnter={(e) => setShowControls(true)}
        // onMouseLeave={(e) => setShowControls(false)}
        onTouchStart={(e) => setShowControls(!showControls)}
        onTouchMove={(e) => setShowControls(true)}
        /* onTouchEnd={(e) =>
          setTimeout(() => {
            setShowControls(false);
          }, 1500)
        } */
      >
        {caption.txt}
      </h2>
      <Moveable
        className={tm(
          "h-full w-full",
          showControls ? "control-box-show" : "control-box-hide",
        )}
        target={document.querySelector(`#caption-${caption.id}`)}
        dragContainer={document.querySelector("#memeCapture")}
        origin={false}
        edge={true}
        bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: "css" }}
        // Drag controls
        draggable={true}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        throttleDrag={1}
        // Resize controls
        resizable={true}
        throttleResize={1}
        onResize={(e) => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
        }}
        // Rotation controls
        rotatable={true}
        rotateAroundControls={true}
        onRotate={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
        // Snap controls
        snappable={true}
      ></Moveable>
    </>
  );
}

export default MemeCaption;
