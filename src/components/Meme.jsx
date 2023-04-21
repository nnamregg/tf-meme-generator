import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { AiOutlineAlignLeft, AiOutlineClear, AiOutlineCloseCircle, AiFillSave } from 'react-icons/ai';
import { BsBorderWidth, BsImage } from 'react-icons/bs';
import { BiFontSize, BiFont, BiMessageAltAdd } from 'react-icons/bi';
import { MdFormatColorFill, MdBorderColor } from 'react-icons/md';

function Meme() {
    const [meme, setMeme] = useState({
        captions: {},
        randomImage: "http://i.imgflip.com/1bij.jpg",
        fontFamily: "Impact",
        fontSize: "12",
        fontColor: "#fff",
        fontStrokeWidth: 1.5,
        fontStrokeColor: "#000",
        textAlign: "center"
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes();

        Coloris.init();
        Coloris({
            el: '.form--color-picker',
            wrap: true,
            // theme: 'pill',
            theme: 'default',
            selectInput: true,
            themeMode: 'auto'
        });
    }, [])


    const fontFamilies = ["Impact", "Comic Sans", "Arial", "Myriad Pro", "Montserrat"];
    const fontSizes = [7,8,9,10,11,12,14,16,17,18,20];
    const textAlignments = {"start": "Izquierda",
                            "end": "Derecha",
                            "center": "Centrado"};
    const strokeWidths = [0,.5, 1, 1.5, 2, 2.5, 3]; 

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function addCaption() {
        const captionsLenght = Object.keys(meme.captions).length;
        
        if(captionsLenght >= 5) {
            alert("Ha llegado al máximo de cuadros de texto");
            return;
        }

        const captionStr = "caption" + parseInt(Math.random() * 100)
        const newCaptions = {...meme.captions}
        newCaptions[`${captionStr}`] = ""; 

        setMeme(prevMeme => ({
            ...prevMeme,
                captions: newCaptions
        }))
    }

    function handleCaptions(e) {
        const { name, value } = e.target
        const newCaptions = {...meme.captions}
        newCaptions[name] = value

        setMeme(prevMeme => ({
            ...prevMeme, 
                captions: newCaptions
        }))
    }

    function deleteCaption(e) {
        const { name } = e.currentTarget.previousSibling.previousSibling;
        const newCaptions = {...meme.captions}
        delete newCaptions[name]
        setMeme(prevMeme => ({
            ...prevMeme, 
                captions: newCaptions
        }))
    }

    function clearInput(e) {
        const { name } = e.currentTarget.previousSibling
        const newCaptions = {...meme.captions}
        newCaptions[name] = ""

        setMeme(prevMeme => ({
            ...prevMeme,
                captions: newCaptions
        }))
    }

    const setDragControls = (e) => {
        (e.type === 'mousedown')
            ? e.currentTarget.addEventListener('mousemove', dragMouse)
            : (e.type === 'touchstart')
            ? e.currentTarget.addEventListener('touchmove', dragTouch)
            : null;
    }

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
        })

        const getStyle = window.getComputedStyle(currentTarget)
        const leftValue = parseInt(getStyle.left)
        const topValue = parseInt(getStyle.top)

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
                : null
        }

        const getYLimit = () => {
            return movementY < 0
                ? tt > pt
                : movementY > 0
                ? tb < pb
                : null
        }

        if(getXLimit()) {
            currentTarget.style.left = `${leftValue + movementX}px`
        }

        if (getYLimit()) {
            currentTarget.style.top = `${topValue + movementY}px`
        }
    }

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
                    : null
            }

            const getYLimit = () => {
                return e.movementY < 0
                    ? true
                    : e.movementY > 0
                    ? !(e.clientY >= pb)
                    : null
            }

            if(getXLimit()) {
                resizableDiv.style.width = e.pageX - resizableDiv.getBoundingClientRect().left + 'px';
            }

            if(getYLimit()) {
                resizableDiv.style.height = e.pageY - resizableDiv.getBoundingClientRect().top + 'px';
            }
        }

        const stopResize = () => {
            document.removeEventListener('mousemove', resize);
            // document.removeEventListener('touchmove', resize);
            resizableDiv.classList.remove('resizing');
        }

        document.addEventListener('mousemove', resize)
        document.addEventListener('mouseup', stopResize)

        // document.addEventListener('touchmove', resize)
        // document.addEventListener('touchend', stopResize)
    }

    function downloadMeme(e) {
        const datetimestr = () => {
            const regex = /[-\:]/ig;
            const datetime = new Date().toISOString().slice(0, -5)
            const datetimestr = datetime.replaceAll(regex, '').replace('T', '_');
            return datetimestr
        }

        html2canvas(document.getElementById('memeCapture'),
                    {   allowTaint: true,
                        useCORS: true
                    })
                        .then(function (canvas) {
                            let img = canvas.toDataURL("memesImg/png")
                            let link = document.createElement('a')
                            let dateStr = datetimestr()
                            link.download = `tf-meme-generator-${dateStr}.png`
                            link.href = img
                            link.click()
                        });
    }

    return (
        <main>
            <div className="container">
                <div className="meme--editor">
                    <div className="form">
                        <h3 className="form--subtitle">
                            Configuración de fuente
                        </h3>
                        <div className="form--config">
                            <div className="form--row">
                                <BiFont />
                                <select
                                    name="fontFamily"
                                    id="selectFontFamily"
                                    className="form--select"
                                    value={meme.fontFamily}
                                    style={{fontFamily:meme.fontFamily}}
                                    onChange={handleChange}
                                >
                                    {
                                        fontFamilies.map((key, index) => {
                                            return (
                                                <option key={index} value={key}>{key}</option>
                                            )
                                        })
                                    }
                                </select>
                                <BiFontSize />
                                <select
                                    name="fontSize"
                                    id="selectFontSize"
                                    className="form--select"
                                    value={meme.fontSize}
                                    onChange={handleChange}
                                >
                                    {
                                        fontSizes.map((key, index) => {
                                            return (
                                                <option key={index} value={key}>{key}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form--row">
                                <MdFormatColorFill />
                                <input
                                    type="text"
                                    name="fontColor"
                                    id="fontColor"
                                    className="form--color-picker"
                                    value={meme.fontColor}
                                    onInput={handleChange}
                                />
                                <MdBorderColor />
                                <input
                                    type="text"
                                    name="fontStrokeColor"
                                    id="fontStrokeColor"
                                    className="form--color-picker"
                                    value={meme.fontStrokeColor}
                                    onInput={handleChange}
                                />
                                <BsBorderWidth />
                                <select
                                    name="fontStrokeWidth"
                                    id="fontStrokeWidth"
                                    className="form--select"
                                    value={meme.fontStrokeWidth}
                                    onChange={handleChange}
                                    style={{maxWidth:"15%"}}
                                >
                                    {
                                        strokeWidths.map((key, index) => {
                                            return (
                                                <option key={index} value={key}>{key}</option>
                                            )
                                        })
                                    }
                                </select>
                                <AiOutlineAlignLeft />
                                <select
                                    name="textAlign"
                                    id="selectTextAlign"
                                    className="form--select"
                                    value={meme.textAlign}
                                    onChange={handleChange}
                                    style={{maxWidth:"20%"}}
                                >
                                    {
                                        Object.keys(textAlignments).map((key, index) => {
                                            return (
                                                <option key={index} value={key}>{textAlignments[key]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <h3 className="form--subtitle">
                            Armá tu meme
                        </h3>
                        <div className="form--captions">
                            {   Object.keys(meme.captions).map((key, index) => {
                                    return (
                                        <div className="form--row" key={index}>
                                            <input
                                                type="text"
                                                placeholder="Tira tu magia"
                                                name={key}
                                                className="form--input"
                                                value={meme.captions[key]}
                                                onChange={handleCaptions}
                                            />  
                                            <button className="form--input-clear" onClick={clearInput}>
                                                <AiOutlineClear />
                                            </button>
                                            <button className="form--input-delete" onClick={deleteCaption}>
                                                <AiOutlineCloseCircle />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            <div className="form--row">
                                <button className="form--add-captions" onClick={addCaption}>
                                    <BiMessageAltAdd />
                                    Agregar cuadro de texto
                                </button>
                            </div>
                            
                        </div>

                        <button
                            className="form--button"
                            onClick={getMemeImage}
                        >
                            <BsImage />
                            Cambiar imagen
                        </button>
                    </div>
                    <div className="meme">
                        <div id="memeCapture">
                            <img src={meme.randomImage} className="meme--image" />
                            { Object.keys(meme.captions).map((key, index) => {
                                return (
                                    <div className="meme--text-container" id={key} key={index} onMouseDown={setDragControls} onTouchStart={setDragControls}>
                                        <div className="meme--text-resizer" onMouseDown={setResizeControls}></div>
                                        <h2 className="meme--text"
                                            style={{
                                                fontFamily:meme.fontFamily,
                                                fontSize:`${meme.fontSize*3}px`,
                                                color:meme.fontColor,
                                                textAlign:meme.textAlign,
                                                WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                                            }}>
                                            {meme.captions[key]}
                                        </h2>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <button
                    className="save--button"
                    onClick={downloadMeme}
                >
                    <AiFillSave />
                    Guardar meme
                </button>
            </div>
        </main>
    )
}

export default Meme;
