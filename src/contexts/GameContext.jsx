import { createContext, useState } from "react";
import { randomElement, randomNumber } from "../utils";
import levels from "../stores/levels";

const GameContext = createContext();

const generateDeck = () => {
    const colors = ["red", "green", "yellow", "blue", "teal", "purple"];

    return Array.from({ length: 3 }, (_, index) => {
        const color = randomElement(colors);
        colors.splice(colors.indexOf(color), 1);

        return {
            index: index,
            selected: false,
            stack: new Array(randomNumber(3, 6)).fill({
                color: color,
            }),
        };
    });
};

const GameProvider = ({ children }) => {
    const [board, setBoard] = useState([...levels[0].initialBoard]);
    const [deck, setDeck] = useState(generateDeck());

    const addStack = (event, targetRow, targetCol) => {
        event.stopPropagation();

        const selectedStack = deck.filter((stack) => {
            return stack.selected;
        });

        if (selectedStack.length === 0) {
            return;
        }

        if (board[targetRow][targetCol].stack.length > 0) {
            return;
        }

        setBoard(
            board.map((row, rowIndex) => {
                if (rowIndex != targetRow) {
                    return row;
                } else {
                    return row.map((cell, colIndex) => {
                        if (colIndex != targetCol) {
                            return cell;
                        } else {
                            return {
                                ...cell,
                                stack: [
                                    ...cell.stack,
                                    ...selectedStack[0].stack,
                                ],
                            };
                        }
                    });
                }
            }),
        );

        removeStack(selectedStack[0].index);
    };

    const removeStack = (targetStackIndex) => {
        if (deck.length === 1) {
            setDeck(
                Array.from({ length: 3 }, (_, index) => ({
                    index: index,
                    selected: false,
                    stack: new Array(randomNumber(3, 6)).fill({
                        color: randomElement([
                            "red",
                            "green",
                            "yellow",
                            "blue",
                            "teal",
                            "purple",
                        ]),
                    }),
                })),
            );
        } else {
            setDeck(deck.filter((stack) => stack.index !== targetStackIndex));
        }
    };

    const selectStack = (event, targetStackIndex) => {
        event.stopPropagation();

        setDeck(
            deck.map((stack, index) => {
                return {
                    ...stack,
                    index: index,
                    selected: index === targetStackIndex,
                };
            }),
        );
    };

    return (
        <GameContext value={{ addStack, board, deck, selectStack }}>
            {children}
        </GameContext>
    );
};

export { GameContext, GameProvider };
