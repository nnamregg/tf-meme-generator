import axios from "axios";
import { useState, useEffect } from "react";

export function useMemesList() {
  const [memesList, setMemesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)

    async function fetchMemesList () {
      try {
        const res = await axios.get("https://api.imgflip.com/get_memes");
        const memes = res.data.data.memes;
        setMemesList(memes);
        localStorage.setItem("memesList", JSON.stringify(memes));
        
      } catch (e) {
        console.error("error -> ", e);
        setError(e);
        localStorage.setItem("fetchError", JSON.stringify(e));
      }
    };
    
    if(!localStorage.getItem("memesList")) {
      fetchMemesList()
    } else {
      const parsedList = JSON.parse(localStorage.getItem("memesList"))
      setMemesList(parsedList)
    }
    
    setLoading(false)
    
  }, []);

  return { memesList, loading, error };
}
