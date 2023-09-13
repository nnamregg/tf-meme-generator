import { useEffect } from "react";
import {
  fontFamilies,
  fontSizes,
  textAlignments,
  strokeWidths,
} from "../../utils/configurationOptions";
import "@melloware/coloris/dist/coloris.css";
import Coloris from "@melloware/coloris";
import {
  Button,
  Select,
  Option,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import { BsBorderWidth, BsShuffle } from "react-icons/bs";
import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdOutlineCancel,
  MdFormatColorFill,
  MdBorderColor,
  MdOutlineMessage,
  MdSearch,
} from "react-icons/md";

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
      el: ".coloris",
      themeMode: "auto",
      selectInput: true,
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

  const handleDelCaption = (id) => deleteCaption(id);

  function cycleArray(arr, val) {
    const index = arr.indexOf(val);
    let next = index;
    index === arr.length - 1 ? (next = 0) : next++;

    return next;
  }

  const handleTextAlignConfig = (e) => {
    // console.info("handleTextAlignConfig -> ");
    const next = cycleArray(textAlignments, e.currentTarget.name);
    handleConfig("textAlign", textAlignments.at(next));
  };

  const handleStrokeWidthConfig = (e) => {
    // console.info("handleStrokeWidthConfig -> ");
    const next = cycleArray(strokeWidths, e.currentTarget.name);
    handleConfig("fontStrokeWidth", strokeWidths.at(next));
  };

  const handleConfig = (name, value) => {
    const e = {
      target: { name, value },
    };
    setConfig(e);
  };

  return (
    <section className="flex max-h-full flex-col lg:w-1/3">
      <div className="mx-3 border-b-2 border-dotted border-gray-900 py-5">
        <h3 className="mb-6 font-semibold uppercase text-teal-300">Fuente</h3>

        <div className="my-6 flex gap-3">
          <Select
            variant="standard"
            size="md"
            color="teal"
            label="Familia"
            name="fontFamily"
            id="selectFontFamily"
            value={config.fontFamily}
            style={{ fontFamily: config.fontFamily }}
            // No es lo ideal, pero los devs de material-tailwind decidieron hacer <Select /> que no son <select> :(
            onChange={(value) => handleConfig("fontFamily", value)}
          >
            {fontFamilies.map((key, index) => (
              <Option key={index} value={key}>
                {key}
              </Option>
            ))}
          </Select>

          <Select
            variant="standard"
            color="teal"
            size="md"
            label="Tamaño"
            name="fontSize"
            id="selectFontSize"
            value={config.fontSize}
            className="min-w-fit"
            onChange={(value) => handleConfig("fontSize", value)}
          >
            {fontSizes.map((key, index) => (
              <Option key={index} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-6 flex gap-3">
          <Tooltip content="Alineación de texto" placement="bottom-start">
            <IconButton
              size="lg"
              className="m-auto shrink-0 rounded-full text-base"
              name={config.textAlign}
              onClick={(e) => handleTextAlignConfig(e)}
            >
              {(() => {
                switch (config.textAlign) {
                  case "start":
                    return <MdFormatAlignLeft />;
                  case "center":
                    return <MdFormatAlignCenter />;
                  case "end":
                    return <MdFormatAlignRight />;
                  default:
                    return null;
                }
              })()}
            </IconButton>
          </Tooltip>

          <Tooltip content="Grosor de borde" placement="bottom-start">
            <IconButton
              size="lg"
              className="m-auto shrink-0 rounded-full text-base"
              name={config.fontStrokeWidth}
              onClick={(e) => handleStrokeWidthConfig(e)}
            >
              {(() => {
                switch (config.fontStrokeWidth) {
                  case "0":
                    return <MdOutlineCancel />;
                  default:
                    return <BsBorderWidth />;
                }
              })()}
            </IconButton>
          </Tooltip>

          <Tooltip content="Color de fondo" placement="bottom-start">
            <div className="relative mx-auto">
              <MdFormatColorFill className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-base" />
              <input
                name="fontColor"
                id="fontColor"
                className="coloris h-full w-full cursor-pointer"
                value={config.fontColor}
                onInput={setConfig}
              />
            </div>
          </Tooltip>

          <Tooltip content="Color de borde" placement="bottom-start">
            <div className="relative mx-auto">
              <MdBorderColor className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-base" />
              <input
                name="fontStrokeColor"
                id="fontStrokeColor"
                className="coloris h-full w-full cursor-pointer"
                value={config.fontStrokeColor}
                onInput={setConfig}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="mx-3 overflow-y-auto border-b-2 border-dotted border-gray-900 px-1 py-5 lg:order-last lg:border-0">
        <h3 className="mb-6 font-semibold uppercase text-teal-300">Texto</h3>
        {captions.map((caption, index) => {
          return (
            <div
              className="relative my-3 flex w-full max-w-full"
              key={`${index}-${caption.id}`}
            >
              <Input
                variant="outlined"
                color="teal"
                size="md"
                label={`nº ${index + 1}`}
                value={caption.txt}
                onChange={(e) => setCaptions(caption.id, e.target.value)}
              />
              <IconButton
                variant="text"
                size="sm"
                color="red"
                className="!absolute right-1 top-1 rounded-full"
                onClick={() => handleDelCaption(caption.id)}
              >
                <MdOutlineCancel className="text-base" />
              </IconButton>
            </div>
          );
        })}

        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          className="mt-4 flex w-fit items-center gap-2"
          onClick={handleAddCaption}
          disabled={captionsLenght >= 5}
        >
          <MdOutlineMessage />
          Agregar cuadro de texto
        </Button>
      </div>

      <div className="mx-3 border-0 py-5 lg:border-b-2 lg:border-dotted lg:border-gray-900">
        <h3 className="mb-6 font-semibold uppercase text-teal-300">
          Plantilla
        </h3>
        <div className="flex gap-2">
          <Button
            variant="filled"
            className="my-2 flex w-full items-center justify-center gap-3"
            onClick={randomizeMeme}
          >
            <BsShuffle />
            Aleatoria
          </Button>
          <Button
            variant="filled"
            className="my-2 flex w-full items-center justify-center gap-3"
            onClick={handleGalleryModal}
          >
            <MdSearch className="text-base" />
            Buscar
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Configuration;
