import { useEffect } from "react";

function Modal({ canvas, handleModal }) {    
    useEffect(() => {
        async function setCanvas() {
            const saveModal = document.getElementById('saveModal');
            saveModal.appendChild(canvas);
        }
        setCanvas()
    }, [])

    function closeModal() {
        document.removeEventListener('keyup', handleKeyEvent)
        handleModal()
    }

    function handleKeyEvent(e) {
        if(e.key === 'Escape') {
            closeModal()
        }
    }

    document.addEventListener('keyup', handleKeyEvent)

    return(
        <div className="save-modal" id="saveModal">
            <button className="save-modal--close-btn" onClick={closeModal}>
                ❌
            </button>
        </div>
    )
}

export default Modal;
