import { useState } from "react";
import {
  AiOutlineSearch,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";

function GalleryModal({ memesList, dispatchMeme, handleGalleryModal }) {
  const [filterMemes, setFilterMemes] = useState(memesList);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  function fuzzySearch(query, name) {
    const str = name.toLowerCase();
    let i = 0,
      n = -1,
      l;
    query = query.toLowerCase();

    for (; (l = query[i++]); ) {
      if (!~(n = str.indexOf(l, n + 1))) {
        return false;
      }
    }
    return true;
  }

  function filterTemplates(e) {
    // Validar input
    const val = e.target.value;

    if (!val) {
      setFilterMemes(memesList);
    } else if (val.length < 3) {
      return;
    }

    // Filtar memesList con fuzzySearch  
    const memes = memesList.filter((meme) =>
      fuzzySearch(e.target.value, meme.name)
    );

    setFilterMemes(memes);
  }

  function markTemplate(memeId) {
    // Marcar plantilla para su selección
    if (selectedTemplateId === memeId) {
      setSelectedTemplateId(null);
    } else {
      setSelectedTemplateId(memeId);
    }
  }

  function selectTemplate() {
    // Seleccionar plantilla y cerrar galería
    if(!selectedTemplateId) {
      alert("Error. No hay ninguna plantilla seleccionada.");
      return;
    } else {
      dispatchMeme(selectedTemplateId)
    }

    handleGalleryModal();
  }

  return (
    <div className="modal">
      <div className="modal--search">
        <AiOutlineSearch
          style={{
            position: "absolute",
            top: "30%",
            left: "5%",
          }}
        />
        <input
          type="search"
          name="search-input"
          id="search-input"
          placeholder="Buscar plantilla"
          className="form--input"
          style={{
            textIndent: "18%",
          }}
          autoFocus={true}
          onChange={filterTemplates}
        />
      </div>
      <div className="modal--content">
        <div className="modal--templates-grid">
          {filterMemes.map((meme) => {
            return (
              <div
                key={meme.id}
                className={
                  meme.id === selectedTemplateId
                    ? "modal--template-card selected"
                    : "modal--template-card"
                }
                onClick={() => markTemplate(meme.id)}
              >
                <h3>{meme.name}</h3>
                <img src={meme.url} alt={meme.name} loading="lazy"/>
              </div>
            );
          })}
        </div>
      </div>
      <div className="modal--btns">
        <button className="modal--btn-select" onClick={() => selectTemplate()}>
          <AiFillCheckCircle />
          Elegir plantilla
        </button>
        <button className="modal--btn-cancel" onClick={() => handleGalleryModal()}>
          <AiFillCloseCircle />
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default GalleryModal;
