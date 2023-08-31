import { useState, useEffect } from "react";
import { useMemesList } from "../hooks/useMemesList";
import { ACTIONS, useMemeEditor } from "../hooks/useMemeEditor";
import html2canvas from "html2canvas";
import { AiFillSave } from "react-icons/ai";
import Configuration from "./Configuration";
import Preview from "./Preview";
import GalleryModal from "./GalleryModal";

function MemeEditor() {
  const { memesList, loading, error } = useMemesList();
  const memesIds = memesList.map((meme) => meme.id);
  const [state, dispatch] = useMemeEditor();
  const [rendering, setRendering] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    randomizeMeme();
    // qué hacemos con el error?
    if (error) console.log("Error... ", error);
  }, [memesList]);

  const getRandomListItem = (arr) => {
    // Obtener item aleatorio de lista
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  function randomizeMeme() {
    // Buscar un id de meme aleatorio
    const memeId = getRandomListItem(memesIds);
    // ... y despachar al reducer
    dispatchMeme(memeId);
  }

  const getMemeById = (id) => memesList.find((meme) => meme.id === id);

  // Setear dispatchers
  // - de template:
  const dispatchMeme = (memeId) => {
    const meme = getMemeById(memeId);
    dispatch({ type: ACTIONS.SET_MEME, payload: meme });
  };
  // - de configuracion:
  function setConfig(e) {
    const { name, value } = e.target;
    dispatch({ type: ACTIONS.SET_CONFIG, payload: { name, value } });
  }
  // - de captions:
  const addCaption = () => dispatch({ type: ACTIONS.ADD_CAPTION });
  const setCaptions = (id, value) => {
    dispatch({ type: ACTIONS.SET_CAPTION, payload: { captionId: id, value } });
  };
  const deleteCaption = (captionId) =>
    dispatch({ type: ACTIONS.DELETE_CAPTION, payload: { captionId } });


  const handleGalleryModal = () => {
    setShowModal(!showModal);

    if (!showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };


  function downloadMeme() {
    setRendering(true);
    // Generar string con fecha y hora de creación para generar nombre de archivo
    const datetimestr = () => {
      const regex = /[-\:]/gi;
      const datetime = new Date().toISOString().slice(0, -5);
      const datetimestr = datetime.replaceAll(regex, "").replace("T", "_");
      return datetimestr;
    };

    // Generar archivo .png para descarga
    html2canvas(document.getElementById("memeCapture"), {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      let img = canvas.toDataURL("memesImg/png");
      let link = document.createElement("a");
      let dateStr = datetimestr();
      link.download = `memeplex-${dateStr}.png`;
      link.href = img;
      link.click();
      setRendering(false);
    });
  }

  return (
    <main>
      <div className="container">
        <div className="meme--editor">
          <Configuration
            randomizeMeme={randomizeMeme}
            handleGalleryModal={handleGalleryModal}
            captions={state.captions}
            config={state.config}
            setConfig={setConfig}
            setCaptions={setCaptions}
            addCaption={addCaption}
            deleteCaption={deleteCaption}
          />

          {loading ? (
            // Pero dios mío! ponga un spinner buen hombre!
            <h1>loading...</h1>
          ) : (
            <Preview
              template={state.template}
              captions={state.captions}
              config={state.config}
            />
          )}
        </div>
        <button
          className="save--button"
          onClick={downloadMeme}
          disabled={rendering}
        >
          <AiFillSave />
          Guardar meme
        </button>
      </div>

      {!showModal ? null : (
        <GalleryModal
          memesList={memesList}
          dispatchMeme={dispatchMeme}
          handleGalleryModal={handleGalleryModal}
        />
      )}
    </main>
  );
}

export default MemeEditor;
