import { useState } from "react";
import html2canvas from "html2canvas";
import { AiFillSave } from "react-icons/ai";
import Configuration from "./Configuration";
import Preview from "./Preview";
import GalleryModal from "./Modal";

function Meme({ allMemes }) {
    const [meme, setMeme] = useState({
        captions: [],
        template: "http://i.imgflip.com/1bij.jpg",
        fontFamily: "Impact",
        fontSize: "12",
        fontColor: "#fff",
        fontStrokeWidth: 1.5,
        fontStrokeColor: "#000",
        textAlign: "center"
    });
    const [showModal, setShowModal] = useState(false);

    function getRandomTemplate() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            template: url
        }));
    };

    function getTemplate(meme) {
        setMeme(prevMeme => ({
            ...prevMeme,
            template: meme.url
        }));
    };

    function setConfig(e) {
        const { name, value } = e.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function setCaptions(e) {
        const { name, value } = e.target;
        const index = name.slice(-1);
        const newCaptions = [...meme.captions];
        newCaptions[index] = value;

        setMeme(prevMeme => ({
            ...prevMeme,
            captions: newCaptions
        }));
    }

    function addCaption() {
        const newCaptions = [...meme.captions];
        newCaptions.push("")

        setMeme(prevMeme => ({
            ...prevMeme,
                captions: newCaptions
        }));
    };

    function deleteCaption(index) {
        const newCaptions = [...meme.captions];
        newCaptions.splice(index, 1)
        
        setMeme(prevMeme => ({
            ...prevMeme, 
                captions: newCaptions
        }));
    };

    function clearCaption(index) {
        const newCaptions = [...meme.captions];
        newCaptions[index] = "";
        
        setMeme(prevMeme => ({
            ...prevMeme, 
                captions: newCaptions
        }));
    }

    const handleModal = () => {
        setShowModal(!showModal);

        if(!showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }

    function downloadMeme(e) {
        const datetimestr = () => {
            const regex = /[-\:]/ig;
            const datetime = new Date().toISOString().slice(0, -5);
            const datetimestr = datetime.replaceAll(regex, '').replace('T', '_');
            return datetimestr;
        };

        html2canvas(document.getElementById('memeCapture'),
                    {   allowTaint: true,
                        useCORS: true
                    }).then(function (canvas) {
                        let img = canvas.toDataURL("memesImg/png")
                        let link = document.createElement('a')
                        let dateStr = datetimestr()
                        link.download = `tf-meme-generator-${dateStr}.png`
                        link.href = img
                        link.click()
                    });
    };

    return (
        <main>
            <div className="container">
                <div className="meme--editor">

                    <Configuration
                        meme={meme}
                        setConfig={setConfig}
                        getRandomTemplate={getRandomTemplate}
                        handleModal={handleModal}
                        setCaptions={setCaptions}
                        addCaption={addCaption}
                        deleteCaption={deleteCaption}
                        clearCaption={clearCaption}
                    />
                    
                    <Preview meme={meme} />
                </div>
                <button
                    className="save--button"
                    onClick={downloadMeme}
                >
                    <AiFillSave />
                    Guardar meme
                </button>
            </div>
            { showModal
                ? <GalleryModal allMemes={allMemes} getTemplate={getTemplate} handleModal={handleModal}/>
                : null
            }
        </main>
    )
}

export default Meme;
