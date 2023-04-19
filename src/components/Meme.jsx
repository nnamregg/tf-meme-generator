import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { AiOutlineClear, AiOutlineCloseCircle, AiFillSave } from 'react-icons/ai';
import { BsBorderWidth, BsImage } from 'react-icons/bs';
import { BiFontSize, BiFont, BiMessageAltAdd } from 'react-icons/bi';
import { MdFormatColorFill, MdBorderColor } from 'react-icons/md';

function Meme() {
    const [meme, setMeme] = useState({
        captions: {},
        randomImage: "http://i.imgflip.com/1bij.jpg",
        fontFamily: "",
        fontSize: "",
        fontColor: "#fff",
        fontStrokeColor: "#000",
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes();
        setFontsSelector();
    }, [])

    useEffect(() => {
        console.log('effect meme.captions')
        setDragControls();
    }, [Object.keys(meme.captions).length])

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

    function setDragControls() {
        const textBoxes = document.querySelectorAll('.meme--text')

        textBoxes.forEach(textBox => {
            if(!textBox.getAttribute('listener')) {
                textBox.addEventListener('mousedown', () => {
                    textBox.addEventListener('mousemove', dragText)
                });
                textBox.setAttribute('listener', true)
            }
        })
    }

    function dragText({target, movementX, movementY}){
        document.addEventListener('mouseup', () => {
            target.removeEventListener('mousemove', dragText)
        }, { once: true })

        const getStyle = window.getComputedStyle(target)
        const leftValue = parseInt(getStyle.left)
        const topValue = parseInt(getStyle.top)

        const targetBounding = target.getBoundingClientRect();
        const tl = parseInt(targetBounding.left);
        const tr = parseInt(targetBounding.right);
        const tt = parseInt(targetBounding.top);
        const tb = parseInt(targetBounding.bottom);

        const parentBounding = target.parentElement.getBoundingClientRect();
        const pl = parseInt(parentBounding.left);
        const pr = parseInt(parentBounding.right);
        const pt = parseInt(parentBounding.top);
        const pb = parseInt(parentBounding.bottom);

        const getXLimit = () => {
            return tl < pl && (movementX < 0) || tr > pr && (movementX > 0);
        }

        const getYLimit = () => {
            return tt < pt && (movementY < 0) || tb > pb && (movementY > 0);
        }

        if (!(getXLimit() || getYLimit())) {
            target.style.left = `${leftValue + movementX}px`
            target.style.top = `${topValue + movementY}px`
        }

    }

    function setFontsSelector() {
        const fonts = ["Impact", "Comic Sans", "Arial", "Myriad Pro", "Montserrat"];
        const selectFamily = document.getElementById('selectFontFamily');

        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = option.innerText = option.style.fontFamily = font;
            selectFamily.appendChild(option)
        })

        const sizes = [7,8,9,10,11,12,14,16,17,18,20];
        const selectSize = document.getElementById('selectFontSize');

        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = option.innerText = size;
            selectSize.appendChild(option)
        })

        Coloris.init();
        Coloris({
            el: '.form--color-picker',
            wrap: false,
            theme: 'pill',
            selectInput: true,
            themeMode: 'auto',
            onChange: (color) => {
                // console.log(color)
            }
        });

        setMeme(prevMeme => ({
            ...prevMeme,
                fontFamily: fonts[0],
                fontSize: sizes[3],
                fontStrokeWidth: 2
        }))
    }

    function downloadMeme(e) {
        const datetimestr = () => {
            const regex = /[-T\:]/ig;
            const datetime = new Date().toISOString().slice(0, -5)
            const datetimestr = datetime.replaceAll(regex, '');
            return datetimestr
        }

        html2canvas(document.getElementById('memeCapture'),
                    { allowTaint: true, useCORS: true })
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
                                    <option value="" disabled>Elegír fuente:</option>
                                </select>
                                <BiFontSize />
                                <select
                                    name="fontSize"
                                    id="selectFontSize"
                                    className="form--select"
                                    value={meme.fontSize}
                                    onChange={handleChange}
                                >
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
                                    onChange={handleChange}>
                                        <option value="0">0</option>
                                        <option value=".5">.5</option>
                                        <option value="1">1</option>
                                        <option value="1.5">1.5</option>
                                        <option value="2">2</option>
                                        <option value="2.5">2.5</option>
                                        <option value="3">3</option>
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
                            <button className="form--add-captions" onClick={addCaption}>
                                <BiMessageAltAdd />
                                Agregar cuadro de texto
                            </button>
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
                            {   Object.keys(meme.captions).map((key, index) => {
                                return (
                                    <h2 className="meme--text" id={key} key={index}
                                        style={{
                                            fontFamily:meme.fontFamily,
                                            fontSize:`${meme.fontSize*3}px`,
                                            color:meme.fontColor,
                                            WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                                        }}>
                                        {meme.captions[key]}
                                    </h2>
                                )
                                })
                            }
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
