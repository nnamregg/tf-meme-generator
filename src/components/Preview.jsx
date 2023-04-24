function Preview({ meme }) {

    const setDragControls = (e) => {
        (e.type === 'mousedown')
            ? e.currentTarget.addEventListener('mousemove', dragMouse)
            : (e.type === 'touchstart')
            ? e.currentTarget.addEventListener('touchmove', dragTouch)
            : null;
    };

    function dragTouch(e) {
        // console.log(e)

        /* document.addEventListener('touchend', () => {
            e.preventDefault();
            currentTarget.removeEventListener('touchmove', dragText)
        }, { once: true }) */
    }

    function dragMouse({currentTarget, movementX, movementY}){
        document.addEventListener('mouseup', () => {
            currentTarget.removeEventListener('mousemove', dragMouse)
        });

        const getStyle = window.getComputedStyle(currentTarget);
        const leftValue = parseInt(getStyle.left);
        const topValue = parseInt(getStyle.top);

        const targetBounding = currentTarget.getBoundingClientRect();
        const tl = parseInt(targetBounding.left);
        const tr = parseInt(targetBounding.right);
        const tt = parseInt(targetBounding.top);
        const tb = parseInt(targetBounding.bottom);

        const parentBounding = currentTarget.parentElement.getBoundingClientRect();

        const pl = parseInt(parentBounding.left);
        const pr = parseInt(parentBounding.right);
        const pt = parseInt(parentBounding.top);
        const pb = parseInt(parentBounding.bottom);

        const getXLimit = () => {
            return movementX < 0
                ? tl > pl
                : movementX > 0
                ? tr < pr
                : null;
        };

        const getYLimit = () => {
            return movementY < 0
                ? tt > pt
                : movementY > 0
                ? tb < pb
                : null;
        };

        if(getXLimit()) {
            currentTarget.style.left = `${leftValue + movementX}px`;
        };

        if (getYLimit()) {
            currentTarget.style.top = `${topValue + movementY}px`;
        };
    };

    function setResizeControls(e) {
        e.stopPropagation();

        const resizableDiv = e.currentTarget.parentElement;
        resizableDiv.classList.add('resizing');
        const memeCapture = resizableDiv.parentElement;

        const resize = (e) => {
            // console.log(e)
            const pr = parseInt(memeCapture.getBoundingClientRect().right);
            const pb = parseInt(memeCapture.getBoundingClientRect().bottom);

            // console.log('pr = ', pr)
            // console.log('pb = ', pb)

            const getXLimit = () => {
                return e.movementX < 0
                    ? true
                    : e.movementX > 0
                    ? !(e.clientX >= pr)
                    : null;
            };

            const getYLimit = () => {
                return e.movementY < 0
                    ? true
                    : e.movementY > 0
                    ? !(e.clientY >= pb)
                    : null;
            };

            if(getXLimit()) {
                resizableDiv.style.width = e.pageX - resizableDiv.getBoundingClientRect().left + 'px';
            };

            if(getYLimit()) {
                resizableDiv.style.height = e.pageY - resizableDiv.getBoundingClientRect().top + 'px';
            };
        };

        const stopResize = () => {
            document.removeEventListener('mousemove', resize);
            // document.removeEventListener('touchmove', resize);
            resizableDiv.classList.remove('resizing');
        };

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        // document.addEventListener('touchmove', resize)
        // document.addEventListener('touchend', stopResize)
    };
    
    return (
        <div className="meme">
            <div id="memeCapture">
                <img src={meme.template} className="meme--image" />
                { meme.captions.map((caption, index) => {
                    return (
                        <div className="meme--text-container" id={`caption-${index}`} key={index} onMouseDown={setDragControls} onTouchStart={setDragControls}>
                            <div className="meme--text-resizer" onMouseDown={setResizeControls}></div>
                            <h2 className="meme--text"
                                style={{
                                    fontFamily:meme.fontFamily,
                                    fontSize:`${meme.fontSize*3}px`,
                                    color:meme.fontColor,
                                    textAlign:meme.textAlign,
                                    WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                                }}>
                                { caption }
                            </h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 

export default Preview;
