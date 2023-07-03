import { useState } from "react";
import { AiOutlineSearch, AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

function GalleryModal({ allMemes, getTemplate, handleModal }) {
    const [filterMemes, setFilterMemes] = useState(allMemes);
    const [template, setTemplate] = useState({});

    function fuzzySearch(query, name) {
        const str = name.toLowerCase();
        let i = 0, n = -1, l;
        query = query.toLowerCase();

        for (; l = query[i++] ;){
           if (!~(n = str.indexOf(l, n + 1))){
              return false;
           };
        };
        return true;
    };

    function filterTemplates(e) {
        const val = e.target.value;

        if(!val) {
            setFilterMemes(allMemes);
        } else if(val.length < 3) {
            return;
        }

        const memes = allMemes.filter(meme => fuzzySearch(e.target.value, meme.name));

        setFilterMemes(memes);
    }

    function markTemplate(e, meme) {
        if(template.id === meme.id) {
            setTemplate({});
            return;
        }

        setTemplate(meme);
    }

    function selectTemplate() {
        const isTemplateEmpty = () => {
            return Object.keys(template).length === 0;
        }

        if(isTemplateEmpty()) {
            alert("Error. No hay ninguna plantilla seleccionada.");
            return;
        }
        
        getTemplate(template);
        closeModal();
    }

    const closeModal = () => handleModal();

    return(
        <div className="modal">
            <div className="modal--search">
                <AiOutlineSearch style={{
                    position:"absolute",
                    top: "30%",
                    left: "5%"
                    }}
                />
                <input
                    type="search"
                    name="search-input"
                    id="search-input"
                    placeholder="Buscar plantilla"
                    className="form--input"
                    style={{
                        textIndent:"18%"
                    }}
                    autoFocus={true}
                    onChange={filterTemplates} />
            </div>
            <div className="modal--content">
                <div className="modal--templates-grid">
                    {
                        filterMemes.map(meme => {
                            return (
                                <div key={meme.id} className={ meme.id === template.id ? "modal--template-card selected" : "modal--template-card"} onClick={(e) => markTemplate(e, meme)}>
                                    <h3>{meme.name}</h3>
                                    <img src={meme.url} alt={meme.name} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="modal--btns">
                <button className="modal--btn-select" onClick={selectTemplate}>
                    <AiFillCheckCircle />
                    Elegir plantilla
                </button>
                <button className="modal--btn-cancel" onClick={closeModal}>
                    <AiFillCloseCircle />
                    Volver atrás
                </button>
            </div>
        </div>
    )
}

export default GalleryModal;
