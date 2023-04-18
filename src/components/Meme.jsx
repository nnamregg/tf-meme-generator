import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { AiOutlineClear, AiOutlineCloseCircle, AiFillSave } from 'react-icons/ai';
import { BsBorderWidth, BsImage } from 'react-icons/bs';
import { BiFontSize, BiFont } from 'react-icons/bi';
import { MdFormatColorFill, MdBorderColor } from 'react-icons/md';

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
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
        setDragControls();
        setFontsSelector();
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(e) {
        console.log('corre handleChange()')
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function clearInput(e) {
        const { name } = e.currentTarget.previousSibling
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: ''
        }))
    }

    const getTextBoxes = () => {
        const textBoxes = document.querySelectorAll('.meme--text')
        return textBoxes
    }

    function setDragControls() {
        const textBoxes = getTextBoxes()

        textBoxes.forEach(textBox => {
            textBox.addEventListener('mousedown', () => {
                textBox.addEventListener('mousemove', dragText)
            })
        })
    }

    function dragText({target, movementX, movementY}){
        const getStyle = window.getComputedStyle(target)
        const leftValue = parseInt(getStyle.left)
        const topValue = parseInt(getStyle.top)

        target.style.left = `${leftValue + movementX}px`
        target.style.top = `${topValue + movementY}px`

        document.addEventListener('mouseup', () => {
            target.removeEventListener('mousemove', dragText)
        })
    }

    function setFontsSelector() {
        const fonts = ["Impact", "Comic Sans", "Arial", "Myriad Pro", "Montserrat"];
        const selectFamily = document.getElementById('selectFontFamily');

        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = option.innerText = option.style.fontFamily = font;
            selectFamily.appendChild(option)
        })

        const sizes = [8,10,12,14,16,18,20];
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
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        
                        <h3 className="form--subtitle">
                            Armá tu meme
                        </h3>
                        <div className="form--captions">
                            <div className="form--row">
                                <input
                                    type="text"
                                    placeholder="Texto arriba"
                                    name="topText"
                                    className="form--input"
                                    value={meme.topText}
                                    onChange={handleChange}
                                />
                                <button className="form--input-clear" onClick={clearInput}>
                                    <AiOutlineClear />
                                </button>
                                <button className="form--input-delete" >
                                    <AiOutlineCloseCircle />
                                </button>
                            </div>
                            <div className="form--row">
                                <input
                                    type="text"
                                    placeholder="Texto abajo"
                                    name="bottomText"
                                    className="form--input"
                                    value={meme.bottomText}
                                    onChange={handleChange}
                                />
                                <button className="form--input-clear" onClick={clearInput}>
                                    <AiOutlineClear />
                                </button>
                                <button className="form--input-delete" >
                                    <AiOutlineCloseCircle />
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
                            <h2 className="meme--text top"
                                style={{
                                    fontFamily:meme.fontFamily,
                                    fontSize:`${meme.fontSize*3}px`,
                                    color:meme.fontColor,
                                    WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                                }}>
                                {meme.topText}
                            </h2>
                            <h2 className="meme--text bottom"
                                style={{
                                    fontFamily:meme.fontFamily,
                                    fontSize:`${meme.fontSize*3}px`,
                                    color:meme.fontColor,
                                    WebkitTextStroke:`${meme.fontStrokeWidth}px ${meme.fontStrokeColor}`
                                }}>
                                {meme.bottomText}
                            </h2>
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
