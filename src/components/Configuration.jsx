import { useEffect } from "react";
import { fontFamilies, fontSizes, textAlignments, strokeWidths } from "../utils/configurationOptions";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import {
  AiOutlineAlignLeft,
  AiOutlineClear,
  AiOutlineCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsBorderWidth, BsShuffle } from "react-icons/bs";
import { BiFontSize, BiFont, BiMessageAltAdd } from "react-icons/bi";
import { MdFormatColorFill, MdBorderColor } from "react-icons/md";

function Configuration({
  captions,
  config,
  setConfig,
  randomizeMeme,
  handleGalleryModal,
  setCaptions,
  addCaption,
  deleteCaption,
}) {
  useEffect(() => {
    Coloris.init();
    Coloris({
      el: ".form--color-picker",
      wrap: true,
      // theme: 'pill',
      theme: "default",
      selectInput: true,
      themeMode: "auto",
    });
  }, []);

  const captionsLenght = Object.keys(captions).length;

  function handleAddCaption() {

    if (captionsLenght >= 5) {
      alert("Ha llegado al máximo de cuadros de texto");
      return;
    }

    addCaption();
  }

  const handleClearCaption = (id) => setCaptions(id, "");
  const handleDelCaption = (id) => deleteCaption(id);

  return (
    <div className="form">

      <div className="form--template">
        <h3 className="form--subtitle">Template</h3>
        <button className="form--button" onClick={randomizeMeme}>
          <BsShuffle />
          Aleatoria
        </button>
        <button className="form--button" onClick={handleGalleryModal}>
          <AiOutlineSearch />
          Ver Galería
        </button>
      </div>

      <div className="form--config">
        <h3 className="form--subtitle">Fuente</h3>
        <div className="form--row">
          <div className="form--control">
            <BiFont
              style={{
                position: "absolute",
                left: "5px",
              }}
            />
            <select
              name="fontFamily"
              id="selectFontFamily"
              className="form--select"
              value={config.fontFamily}
              style={{ fontFamily: config.fontFamily }}
              onChange={setConfig}
            >
              {fontFamilies.map((key, index) => {
                return (
                  <option key={index} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form--control">
            <BiFontSize
              style={{
                position: "absolute",
                left: "5px",
              }}
            />
            <select
              name="fontSize"
              id="selectFontSize"
              className="form--select"
              value={config.fontSize}
              onChange={setConfig}
            >
              {fontSizes.map((key, index) => {
                return (
                  <option key={index} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="form--row">
          <div className="form--control" style={{ flex: 0 }}>
            <MdFormatColorFill />
            <input
              type="text"
              name="fontColor"
              id="fontColor"
              className="form--color-picker"
              value={config.fontColor}
              onInput={setConfig}
            />
          </div>
          <div className="form--control" style={{ flex: 0 }}>
            <MdBorderColor />
            <input
              type="text"
              name="fontStrokeColor"
              id="fontStrokeColor"
              className="form--color-picker"
              value={config.fontStrokeColor}
              onInput={setConfig}
            />
          </div>
          <div className="form--control">
            <AiOutlineAlignLeft
              style={{
                position: "absolute",
                left: "5px",
              }}
            />
            <select
              name="textAlign"
              id="selectTextAlign"
              className="form--select"
              value={config.textAlign}
              onChange={setConfig}
            >
              {Object.keys(textAlignments).map((key, index) => {
                return (
                  <option key={`${index}-${key}`} value={key}>
                    {textAlignments[key]}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form--control">
            <BsBorderWidth
              style={{
                position: "absolute",
                left: "5px",
              }}
            />
            <select
              name="fontStrokeWidth"
              id="fontStrokeWidth"
              className="form--select"
              value={config.fontStrokeWidth}
              onChange={setConfig}
            >
              {strokeWidths.map((key, index) => {
                return (
                  <option key={index} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="form--captions">
        <h3 className="form--subtitle">Captions</h3>
        {captions.map((caption, index) => {
          return (
            <div className="form--row" key={`${index}-${caption.id}`}>
              <input
                type="text"
                placeholder="01110000 01101100 01100001 01100011 01100101 01101000 01101111 01101100 01100100 01100101 01110010"
                name={caption.id}
                id={caption.id}
                className="form--input"
                value={caption.txt}
                onChange={(e) => setCaptions(caption.id, e.target.value)}
              />
              <button className="form--input-clear" onClick={() => handleClearCaption(caption.id)}>
                <AiOutlineClear />
              </button>
              <button className="form--input-delete" onClick={() => handleDelCaption(caption.id)}>
                <AiOutlineCloseCircle />
              </button>
            </div>
          );
        })}

        <div className="form--row">
          <button className="form--add-captions" onClick={handleAddCaption} disabled={captionsLenght >= 5}>
            <BiMessageAltAdd />
            Agregar cuadro de texto
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuration;
