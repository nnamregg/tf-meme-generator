import { useState } from "react";
import Moveable from "react-moveable";

function MemeCaption({ caption, index, styles }) {
    const [showControls, setShowControls] = useState(false);

    return (
        <>
        <h2 className={`meme--text ${showControls ? "show" : "hide"}`}
            id={`caption-${index}`}
            style={styles}
            onClick={e => setShowControls(!showControls)}
            onTouchStart={e => setShowControls(true)}
            onTouchMove={e => setShowControls(true)}
            onTouchEnd={e => setTimeout(() => {
                setShowControls(false)
            }, 1500) }
            >
            { caption }
        </h2>
        <Moveable
            className={`control-box-${showControls ? "show" : "hide"}`}
            target={document.querySelector(`#caption-${index}`)}
            dragContainer={document.querySelector('#memeCapture')}
            origin={false}
            edge={true}
            bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
            // Drag controls
            draggable={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
            throttleDrag={1}
            // Resize controls
            resizable={true}
            throttleResize={1}
            onResize={e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }}
            // Rotation controls
            rotatable={true}
            rotateAroundControls={true}
            onRotate={e => {
                e.target.style.transform = e.drag.transform;
            }}
            // Snap controls
            snappable={true}
        >
        </Moveable>
        </>
    )
} 

export default MemeCaption;
