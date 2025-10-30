const cell = {
    type: "blank",
    stack: [],
};

const levels = [
    {
        id: 1,
        name: "Level 1",
        description: "This is the first level.",
        initialBoard: [
            [cell, cell, cell, cell, cell],
            [
                cell,
                cell,
                cell,
                {
                    type: "blank",
                    stack: [
                        { color: "red" },
                        { color: "red" },
                        { color: "red" },
                        { color: "blue" },
                        { color: "blue" },
                        { color: "blue" },
                    ],
                },
                cell,
            ],
            [cell, null, cell, null, cell],
            [cell, cell, cell, cell, cell],
            [null, cell, null, cell, null],
        ],
    },
];

export default levels;
