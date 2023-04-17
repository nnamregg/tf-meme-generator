import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Modal from "./Modal";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes();
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
        const {name, value} = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function makeCaptureCanvas() {
        const meme = document.getElementById('memeCapture');
        const container = document.createElement('div');
        container.className = 'save-modal--container';
        container.id = 'memeExport';

        html2canvas(meme, { allowTaint: true }).then(function(canvas) {
            canvas.id = 'memeCanvas';
            container.appendChild(canvas);
        });

        return container;
    }

    const handleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <>
            <main>
                <div className="container">
                    <div className="form">
                        <input 
                            type="text"
                            placeholder="Top text"
                            className="form--input"
                            name="topText"
                            value={meme.topText}
                            onChange={handleChange}
                        />
                        <input 
                            type="text"
                            placeholder="Bottom text"
                            className="form--input"
                            name="bottomText"
                            value={meme.bottomText}
                            onChange={handleChange}
                        />
                        <button 
                            className="form--button"
                            onClick={getMemeImage}
                        >
                            Cambiar imagen 🖼
                        </button>
                    </div>
                    <div className="meme" id="memeCapture">
                        <img src={meme.randomImage} className="meme--image" />
                        <h2 className="meme--text top">{meme.topText}</h2>
                        <h2 className="meme--text bottom">{meme.bottomText}</h2>
                    </div>
                    <button 
                        className="save--button"
                        onClick={handleModal}
                    >
                        Guardar meme 💾
                    </button>
                </div>
            </main>
            { showModal ?
                            <Modal canvas={makeCaptureCanvas()} handleModal={handleModal} />
                        :
                            null
            }
        </>
        

    )
}

export default Meme;
