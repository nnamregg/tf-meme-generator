import { useState, useEffect } from "react";
import { useMemesList } from "../../hooks/useMemesList";
import { ACTIONS, useMemeEditor } from "../../hooks/useMemeEditor";
import html2canvas from "html2canvas";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";
import { MdSave } from "react-icons/md";
import Configuration from "./Configuration";
import Preview from "./Preview";
import GalleryModal from "../Gallery/Modal";

function Main() {
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
      window.scrollTo(0, 0);
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
    <>
      <main>
        <Card
          color="transparent"
          className="mx-auto w-full max-w-6xl overflow-hidden border-2 border-memeplex-800 shadow-lg md:w-11/12 xl:w-4/5"
        >
          <CardBody className="h-full border-b-2 border-gray-900 p-0 lg:flex lg:h-[40rem]">
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
            <section className="w-full bg-memeplex-800 p-0 lg:flex lg:h-full lg:w-2/3 lg:content-center lg:overflow-y-auto lg:border-l-2 lg:border-gray-900 lg:p-2">
              {loading ? (
                <Spinner color="teal" className="m-auto h-20 w-20" />
              ) : (
                <Preview
                  template={state.template}
                  captions={state.captions}
                  config={state.config}
                />
              )}
            </section>
          </CardBody>
          <CardFooter>
            <Button
              variant="filled"
              className="flex items-center justify-center gap-3"
              fullWidth
              onClick={downloadMeme}
              disabled={rendering}
            >
              {rendering ? (
                <Spinner color="teal" className="h-4 w-4" />
              ) : (
                <>
                  <MdSave className="text-base" />
                  Guardar meme
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
      {showModal && (
        <GalleryModal
          memesList={memesList}
          dispatchMeme={dispatchMeme}
          handleGalleryModal={handleGalleryModal}
        />
      )}
    </>
  );
}

export default Main;
