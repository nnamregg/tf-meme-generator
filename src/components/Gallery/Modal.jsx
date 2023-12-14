import { useState, useEffect, useMemo } from "react";
import {
  AiOutlineSearch,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Button, Input } from "@material-tailwind/react";
import TemplateCard from "./TemplateCard";
import Pagination from "./Pagination";

function GalleryModal({ memesList, dispatchMeme, handleGalleryModal }) {
  const [filterMemes, setFilterMemes] = useState(memesList);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize)
  
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const getPageSize = (width) => {
    if(width < 768) return 8;
    if(width < 1024) return 12;
    return 18;
  }
  
  const pageSize = useMemo(() => getPageSize(windowWidth), [windowWidth]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return filterMemes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterMemes, pageSize]);

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
      fuzzySearch(e.target.value, meme.name),
    );

    setFilterMemes(memes);
    setCurrentPage(1);
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
    if (!selectedTemplateId) {
      alert("Error. No hay ninguna plantilla seleccionada.");
      return;
    } else {
      dispatchMeme(selectedTemplateId);
    }

    handleGalleryModal();
  }

  return (
    <section className="fixed left-0 top-0 z-20 flex h-full w-full flex-col overflow-hidden bg-black/80 py-6 backdrop-blur-md md:py-10">
      <header className="relative mx-auto mb-6 w-fit">
        <Input
          type="search"
          name="search-input"
          id="search-input"
          autoFocus={true}
          onChange={filterTemplates}
          variant="standard"
          icon={<AiOutlineSearch />}
          label="Buscar plantilla"
          color="teal"
        />
      </header>
      <div className="mx-auto my-auto grid h-full w-full max-w-6xl grid-cols-2 grid-rows-4 items-center gap-2 overflow-y-auto px-6 md:grid-cols-4 md:grid-rows-3 md:overflow-y-hidden lg:grid-cols-6 lg:grid-rows-3 lg:gap-4">
        {currentTableData.map((meme) => (
          <TemplateCard
            key={meme.id}
            meme={meme}
            isSelected={meme.id === selectedTemplateId}
            markTemplate={markTemplate}
          />
        ))}
      </div>
      <footer className="mx-auto w-[90%] max-w-6xl">
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          totalCount={filterMemes.length}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        <div className="mx-auto flex max-w-md justify-center gap-4">
          <Button
            variant="outlined"
            size="sm"
            color="blue-gray"
            className="flex w-1/2 items-center justify-center gap-3 text-gray-200"
            onClick={() => handleGalleryModal()}
          >
            <AiFillCloseCircle className="text-base" />
            Volver atrás
          </Button>

          <Button
            variant="outlined"
            size="sm"
            color="blue-gray"
            className="flex w-1/2 items-center justify-center gap-3 text-gray-200"
            onClick={() => selectTemplate()}
          >
            <AiFillCheckCircle className="text-base" />
            Elegir plantilla
          </Button>
        </div>
      </footer>
    </section>
  );
}

export default GalleryModal;
