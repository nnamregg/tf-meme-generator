import { useEffect } from "react";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import { AiOutlineAlignLeft, AiOutlineClear, AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsBorderWidth, BsShuffle } from 'react-icons/bs';
import { BiFontSize, BiFont, BiMessageAltAdd } from 'react-icons/bi';
import { MdFormatColorFill, MdBorderColor } from 'react-icons/md';

function Configuration({ meme, setConfig, getRandomTemplate, handleModal, setCaptions, addCaption, deleteCaption, clearCaption }) {
    useEffect(() => {
        Coloris.init();
        Coloris({
            el: '.form--color-picker',
            wrap: true,
            // theme: 'pill',
            theme: 'default',
            selectInput: true,
            themeMode: 'auto'
        });

    }, []);

    const fontFamilies = ["Impact", "Comic Sans", "Arial", "Myriad Pro", "Montserrat"];
    const fontSizes = [7,8,9,10,11,12,14,16,17,18,20,24,28,32];
    const textAlignments = {"start": "Izquierda",
                            "end": "Derecha",
                            "center": "Centrado"};
    const strokeWidths = [0,.5, 1, 1.5, 2, 2.5, 3];

    function handleAddCaption() {
        const captionsLenght = Object.keys(meme.captions).length;
        
        if(captionsLenght >= 5) {
            alert("Ha llegado al máximo de cuadros de texto");
            return;
        }

        addCaption();
    }

    function handleDelCaption(e) {
        const { name } = e.currentTarget.previousSibling.previousSibling;
        const id = name.slice(-1);
        deleteCaption(id);
    };

    function clearInput(e) {
        const { name } = e.currentTarget.previousSibling;
        const id = name.slice(-1);
        clearCaption(id);
    }

    return (
        <div className="form">
            <div className="form--config">
                <h3 className="form--subtitle">
                    Configuración de fuente
                </h3>
                <div className="form--row">
                    <div className="form--control">
                        <BiFont style={{
                                position:"absolute",
                                left:"5px"
                            }} 
                        />
                        <select
                            name="fontFamily"
                            id="selectFontFamily"
                            className="form--select"
                            value={meme.fontFamily}
                            style={{fontFamily:meme.fontFamily}}
                            onChange={setConfig}
                        >
                            { fontFamilies.map((key, index) => {
                                return (
                                    <option key={index} value={key}>{key}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form--control">
                        <BiFontSize style={{
                                position:"absolute",
                                left:"5px"
                            }}
                        />
                        <select
                            name="fontSize"
                            id="selectFontSize"
                            className="form--select"
                            value={meme.fontSize}
                            onChange={setConfig}
                        >
                            { fontSizes.map((key, index) => {
                                return (
                                    <option key={index} value={key}>{key}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="form--row">
                    <div className="form--control" style={{flex:0}}>
                        <MdFormatColorFill />
                        <input
                            type="text"
                            name="fontColor"
                            id="fontColor"
                            className="form--color-picker"
                            value={meme.fontColor}
                            onInput={setConfig}
                        />
                    </div>
                    <div className="form--control" style={{flex:0}}>
                        <MdBorderColor />
                        <input
                            type="text"
                            name="fontStrokeColor"
                            id="fontStrokeColor"
                            className="form--color-picker"
                            value={meme.fontStrokeColor}
                            onInput={setConfig}
                        />
                    </div>
                    <div className="form--control">
                        <AiOutlineAlignLeft style={{
                                position:"absolute",
                                left:"5px"
                            }}
                        />
                        <select
                            name="textAlign"
                            id="selectTextAlign"
                            className="form--select"
                            value={meme.textAlign}
                            onChange={setConfig}
                        >
                            { Object.keys(textAlignments).map((key, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={key}>{textAlignments[key]}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form--control">
                        <BsBorderWidth style={{
                                position:"absolute",
                                left:"5px"
                            }}
                        />
                        <select
                            name="fontStrokeWidth"
                            id="fontStrokeWidth"
                            className="form--select"
                            value={meme.fontStrokeWidth}
                            onChange={setConfig}
                        >
                            { strokeWidths.map((key, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={key}>{key}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form--template">
                <h3 className="form--subtitle">
                    Plantilla
                </h3>
                <button
                    className="form--button"
                    onClick={getRandomTemplate}
                >
                    <BsShuffle />
                    Aleatoria
                </button>
                <button
                    className="form--button"
                    onClick={handleModal}
                >
                    <AiOutlineSearch />
                    Ver Galería
                </button>
            </div>

            <div className="form--captions">
                <h3 className="form--subtitle">
                    Armá tu meme
                </h3>
                {   meme.captions.map((caption, index) => {
                        return (
                            <div className="form--row" key={index}>
                                <input
                                    type="text"
                                    placeholder="Di lo tuyo"
                                    name={`caption-input-${index}`}
                                    className="form--input"
                                    value={caption}
                                    onChange={setCaptions}
                                />  
                                <button className="form--input-clear" onClick={clearInput}>
                                    <AiOutlineClear />
                                </button>
                                <button className="form--input-delete" onClick={handleDelCaption}>
                                    <AiOutlineCloseCircle />
                                </button>
                            </div>
                        )
                    })
                }
                <div className="form--row">
                    <button className="form--add-captions" onClick={handleAddCaption}>
                        <BiMessageAltAdd />
                        Agregar cuadro de texto
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Configuration;
