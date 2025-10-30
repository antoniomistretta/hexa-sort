import { use } from "react";
import { GameContext } from "../contexts/GameContext";
import { cellRadius, cellHeight } from "../constants";
import { getColorHex } from "../utils";

export function Deck() {
    const { board, deck, selectStack } = use(GameContext);

    const tileHeight = cellRadius * Math.sqrt(3);
    const tileWidth = cellRadius * 2;
    const boardHeight = (board.length / 2) * tileHeight;
    const deckGap = 1;

    return (
        <group
            name="deck"
            position={[
                boardHeight,
                -(deck.length - 1) * (cellRadius + deckGap / 2),
                0,
            ]}
        >
            {deck.map((stack, stackIndex) => (
                <group
                    key={stackIndex}
                    onClick={(e) => selectStack(e, stackIndex)}
                    name="stack"
                    position={[
                        0,
                        stackIndex * (tileWidth + deckGap),
                        stack.selected ? 1 : 0,
                    ]}
                >
                    {stack.stack.map((tile, tileIndex) => (
                        <mesh
                            key={tileIndex}
                            position={[
                                0,
                                0,
                                tileIndex * cellHeight + cellHeight,
                            ]}
                            rotation={[Math.PI / 2, 0, 0]}
                        >
                            <cylinderGeometry
                                args={[cellRadius, cellRadius, cellHeight, 6]}
                            />
                            <meshStandardMaterial
                                color={getColorHex(tile.color)}
                            />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
}
