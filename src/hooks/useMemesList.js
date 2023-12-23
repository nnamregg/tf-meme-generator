import axios from "axios";
import { useState, useEffect } from "react";

export function useMemesList() {
  const [memesList, setMemesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchMemesList() {
      setLoading(true);

      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        const memes = res.data.data.memes;
        setMemesList(memes);
        setFetchError(null);
        localStorage.setItem("memesList", JSON.stringify(memes));
      } catch (e) {
        setFetchError(e);
        // localStorage.setItem("fetchError", JSON.stringify(e));
      }

      setLoading(false);
    }

    if (!localStorage.getItem("memesList")) {
      fetchMemesList();
    } else {
      const parsedList = JSON.parse(localStorage.getItem("memesList"));
      setMemesList(parsedList);
    }
  }, []);

  return { memesList, loading, fetchError };
}
