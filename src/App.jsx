import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import MemeEditor from './components/MemeEditor';
import './App.css';

function App() {
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        async function getMemes() {
            try {
                const res = await axios.get("https://api.imgflip.com/get_memes");
                const memes = res.data.data.memes;
                setAllMemes(memes);    
            } catch (error) {
                alert('Error: ', error);
            }
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

export default App;
