/* --- Levels data --- */

const levels = [
  // level 1
  {
    id: 1,
    // the blocks to show in the toolbox
    blocks: ["move", "turn", "answerBlock"],
    // game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 2,
        y: 1,
      },
      // game task
      task: [
        {
          x: 1,
          y: 1,
          rightAnswer: 5,
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
    },
  },
  //level 2
  {
    id: 2,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // maximum blocks allowed
    maxBlocks: 2,
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 5,
        y: 0,
      },
      // game task
      task: [],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
      ],
    },
  }, //game3
  {
    id: 3,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // game data
    maxBlocks: 6,
    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 2,
        y: 5,
      },
      // game task
      task: [
        {
          x: 2,
          y: 0,
          rightAnswer: 97,
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
      ],
    },
  }, //game4
  {
    id: 4,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // game data
    maxBlocks: 7,

    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 4,
        y: 4,
      },
      // game task
      task: [
        {
          x: 2,
          y: 2,
          rightAnswer: 30,
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
        [2, 2],
        [3, 2],
        [3, 3],
        [4, 3],
        [4, 4],
      ],
    },
  }, //game5
  {
    id: 5,
    // game data
    maxBlocks: 6,
    blocks: ["move", "turn", "answerBlock", "repeat_until", "if_path"],
    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 2,
        y: 2,
      },
      // game task
      task: [
        {
          x: 2,
          y: 4,
          rightAnswer: "marsas",
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 3],
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    },
  }, //game6
  {
    id: 6,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // game data
    maxBlocks: 8,

    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 4,
        y: 0,
      },
      // game task
      task: [
        {
          x: 2,
          y: 4,
          rightAnswer: 0,
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
        [1, 2],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [3, 3],
        [4, 3],
        [4, 2],
        [4, 1],
        [4, 0],
      ],
    },
  }, // game7
  {
    id: 7,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // game data
    maxBlocks: 25, //9,

    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: -5,
        y: 3,
      },
      // game task
      task: [
        {
          x: 1,
          y: 3,
          rightAnswer: 1000000,
          optional: false,
        },
        {
          x: -3,
          y: 4,
          rightAnswer: 180,
          optional: true,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [0, 2],
        [0, 3],
        [-1, 3],
        [-2, 3],
        [-2, 2],
        [-2, 1],
        [-2, 0],
        [-1, 1],
        [-2, 1],
        [-3, 1],
        [-4, 1],
        [-5, 1],
        [-4, 0],
        [-4, 1],
        [-4, 2],
        [-4, 3],
        [-5, 3],
        [-3, 3],
        [-3, 4],
        [-3, 5],
        [-4, 5],
        [-2, 5],
        [-1, 5],
        [0, 5],
      ],
    },
  },

  // level 8
  {
    id: 8,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path",
      "if_else_path",
    ],
    // game data
    maxBlocks: 14,

    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 3,
        y: 5,
      },
      // game task
      task: [
        {
          x: 2,
          y: 2,
          rightAnswer: 92,
          optional: false,
        },
        {
          x: 4,
          y: 4,
          rightAnswer: 105,
          optional: false,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [1, 2],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 4],
        [1, 5],
        [3, 2],
        [4, 2],
        [5, 2],
        [5, 1],
        [5, 0],
        [4, 3],
        [4, 4],
        [3, 4],
        [3, 5],
        [5, 4],
        [5, 5],
      ],
    },
  },
  // level 9
  {
    id: 9,
    blocks: [
      "move",
      "turn",
      "answerBlock",
      "repeat_until",
      "if_path_only_answer",
    ],
    // game data
    maxBlocks: 9,

    //game data
    game: {
      // pegman data
      pegman: {
        direction: 1,
        x: 0,
        y: 0,
      },
      // marker data
      marker: {
        x: 3,
        y: 5,
      },
      // game task
      task: [
        {
          x: 2,
          y: 2,
          rightAnswer: 92,
        },
      ],
      // game path
      path: [
        // [x, y]
        [0, 0],
      ],
    },
  },
];
