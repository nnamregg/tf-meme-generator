import { useReducer } from "react";
import { initialConfig } from "../utils/configurationOptions";

export const ACTIONS = {
  SET_MEME: "set-meme",
  ADD_CAPTION: "add-caption",
  SET_CAPTION: "set-caption",
  DELETE_CAPTION: "delete-caption",
  SET_CONFIG: "set-config",
};

export function useMemeEditor() {
  const initialState = {
    template: null,
    config: initialConfig,
    captions: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_MEME:
        return {
          ...state,
          template: action.payload,
        };

      case ACTIONS.ADD_CAPTION:
        const id = Date.now();
        const newCaption = {
          id,
          txt: "",
        };

        return {
          ...state,
          captions: [...state.captions, newCaption],
        };

      case ACTIONS.SET_CAPTION: {
        const newCaptions = [...state.captions];
        const { captionId, value } = action.payload;

        const caption = newCaptions.find((caption) => caption.id === captionId);
        caption.txt = value;

        return {
          ...state,
          captions: newCaptions,
        };
      }

      case ACTIONS.DELETE_CAPTION: {
        const { captionId } = action.payload;

        return {
          ...state,
          captions: [
            ...state.captions.filter((caption) => caption.id !== captionId),
          ],
        };
      }

      case ACTIONS.SET_CONFIG: {
        const { name, value } = action.payload;

        return {
          ...state,
          config: {
            ...state.config,
            [name]: value,
          },
        };
      }

      default: {
        console.error(`Error. Acción desconocida: ${action.type}`);
        return state;
      }
    }
  };

  const [state, action] = useReducer(reducer, initialState);

  return [state, action];
}
