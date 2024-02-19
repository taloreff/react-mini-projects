import { AnimalList } from "./AnimalList.jsx"
import { CountDown } from "./CountDown.jsx"
import { MouseMonitor } from "./MouseMonitor.jsx"
import { SeasonClock } from "./SeasonClock.jsx"
import { WatcherApp } from "./WatcherApp.jsx"
const { useState } = React

export function Home() {
    const [page, setPage] = useState('');
    const [animalInfos, setAnimalInfos] = useState([
        { type: "Malayan Tiger", count: 787 },
        { type: "Mountain Gorilla", count: 212 },
        { type: "Fin Whale", count: 28 },
    ]);

    const components = {
        AnimalList: <AnimalList animalInfos={animalInfos} />,
        CountDown: <CountDown toTime={Date.now() + 1000 * 10}
            startFrom={10}
            onDone={() => {
                new Audio("./assets/audios/audio.mp3").play();
            }} />,
        MouseMonitor: <MouseMonitor />,
        SeasonClock: <SeasonClock />,
        WatcherApp: <WatcherApp />
    };

    function showComponent(cmpName) {
        setPage(cmpName);
    }

    return (
        <div>
            <nav className="navbar">
                <div className="nav-left">
                    <a href="#" className="home-btn" onClick={() => { setPage('') }}>Home</a>
                </div>
                <div className="nav-right">
                    {Object.keys(components).map(cmpName => {
                        const displayName = cmpName
                            .split(/(?=[A-Z])/)
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        return (
                            <button key={cmpName} onClick={() => showComponent(cmpName)}>
                                {displayName}
                            </button>
                        );
                    })}
                </div>
            </nav>
            <div className="main-content">
                {page === '' ? (
                    <div className="home-landing">
                        <h1>Welcome to Our Website</h1>
                        <p>Explore various components, and enjoy!</p>
                    </div>
                ) : components[page]}
            </div>
        </div>
    );
}
