import { GameProvider } from "./contexts/GameContext";
import { Scene } from "./components/Scene";
import { Board } from "./components/Board";
import { Deck } from "./components/Deck";

function App() {
    return (
        <GameProvider>
            <Scene>
                <Board />
                <Deck />
            </Scene>
        </GameProvider>
    );
}

export default App;
