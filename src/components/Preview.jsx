import MemeCaption from "./MemeCaption";

function Preview({ meme }) {
    
    return (
        <div className="meme">
            <div id="memeCapture">
                
                <img src={meme.template} className="meme--image" />

                { meme.captions.map((caption, index) =>
                    <MemeCaption
                        key={`caption-${index}`}
                        caption={caption}
                        index={index}
                        styles={{
                            fontFamily:meme.fontFamily,
                            fontSize:`${meme.fontSize*3}px`,
                            color:meme.fontColor,
                            textAlign:meme.textAlign,
                            WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                        }} 
                    />
                )}

            </div>
        </div>
    )
} 

export default Preview;
