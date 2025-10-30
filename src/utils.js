export const randomElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

export const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getColorHex = (color) => {
    switch (color) {
        case "red":
            return "#ff0000";
        case "green":
            return "#00ff00";
        case "blue":
            return "#0000ff";
        case "yellow":
            return "#ffff00";
        case "teal":
            return "#00ffff";
        case "purple":
            return "#ff00ff";
    }
};
