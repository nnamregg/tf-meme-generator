import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = useState([])

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

    function downloadMeme(e) {
        const datetimestr = () => {
            const regex = /[-T\:]/ig;
            const datetime = new Date().toISOString().slice(0,-5)
            const datetimestr = datetime.replaceAll(regex, '');
            return datetimestr
        }

        html2canvas(document.getElementById('memeCapture'), { allowTaint: true, useCORS: true }).then(function(canvas) {
            let img = canvas.toDataURL("memesImg/png")
            let link = document.createElement('a')
            let str = datetimestr()
            link.download = `tf-meme-generator-${str}.png`
            link.href = img
            link.click()
        });
    }

    return (
        <main>
            <div className="container">
                <div className="form">
                    <input 
                        type="text"
                        placeholder="Texto arriba"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Texto abajo"
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
                    onClick={downloadMeme}
                >
                    Guardar meme 💾
                </button>
            </div>
        </main>
        
    )
}

export default Meme;
