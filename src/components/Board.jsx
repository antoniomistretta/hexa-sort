import { use } from "react";
import { GameContext } from "../contexts/GameContext";
import { cellRadius, cellHeight } from "../constants";
import { getColorHex } from "../utils";

export function Board() {
    const { addStack, board } = use(GameContext);

    // calculations from https://www.redblobgames.com/grids/hexagons/
    const height = Math.sqrt(3) * cellRadius;
    const width = cellRadius * 2;
    const verticalDistance = height / 2;
    const horizontalDistance = width * 0.75;

    return (
        <group
            name="board"
            position={[-(height * 2.5), -(horizontalDistance * 2), 0]}
        >
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    if (cell === null) return;

                    switch (cell.type) {
                        case "blank": {
                            return (
                                <group
                                    key={`${rowIndex}-${colIndex}`}
                                    name="cell"
                                    position={[
                                        rowIndex * height -
                                            (colIndex % 2
                                                ? verticalDistance
                                                : 0),
                                        horizontalDistance * colIndex,
                                        0,
                                    ]}
                                >
                                    <mesh
                                        onClick={(e) =>
                                            addStack(
                                                e,
                                                e.eventObject.userData.row,
                                                e.eventObject.userData.col,
                                            )
                                        }
                                        userData={{
                                            row: rowIndex,
                                            col: colIndex,
                                        }}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    >
                                        <cylinderGeometry
                                            args={[
                                                cellRadius,
                                                cellRadius,
                                                cellHeight,
                                                6,
                                            ]}
                                        />
                                        <meshLambertMaterial
                                            color={
                                                rowIndex % 2
                                                    ? colIndex % 2
                                                        ? "#dcdcdc"
                                                        : "#c8c8c8"
                                                    : colIndex % 2
                                                      ? "#a9a9a9"
                                                      : "#909090"
                                            }
                                        />
                                    </mesh>

                                    {cell.stack.length > 0 &&
                                        cell.stack.map((tile, tileIndex) => (
                                            <mesh
                                                key={tileIndex}
                                                position={[
                                                    0,
                                                    0,
                                                    tileIndex * cellHeight +
                                                        cellHeight,
                                                ]}
                                                rotation={[Math.PI / 2, 0, 0]}
                                            >
                                                <cylinderGeometry
                                                    args={[
                                                        cellRadius * 0.9,
                                                        cellRadius * 0.9,
                                                        cellHeight,
                                                        6,
                                                    ]}
                                                />
                                                <meshLambertMaterial
                                                    color={getColorHex(
                                                        tile.color,
                                                    )}
                                                />
                                            </mesh>
                                        ))}
                                </group>
                            );
                        }
                    }
                }),
            )}
        </group>
    );
}
