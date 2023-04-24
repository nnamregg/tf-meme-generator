import { useState, useEffect } from 'react'
import Header from './components/Header'
import MemeEditor from './components/MemeEditor'
import './App.css'

function App() {
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();

    }, []);

    return (
        <div className="App">
            <Header />
            <MemeEditor allMemes={allMemes} />
        </div>
    )
}

export default App
