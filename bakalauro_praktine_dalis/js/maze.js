pathWidth = 30; //Width of the Maze Path
wall = 30; //Width of the Walls between Paths
outerWall = 10; //Width of the Outer most wall
width = 4; //Number paths fitted horisontally
height = 4; //Number paths fitted vertically
delay = 1; //Delay between algorithm cycles
x = (width / 2) | 0; //Horisontal starting position
y = (height / 2) | 0; //Vertical starting position
seed = (Math.random() * 100000) | 0; //Seed for random numbers
// wallColor = "#d24"; //Color of the walls
wallColor = "#f1eee7";
pathColor = "#fffb00"; //Color of the path "#D5AC1C"
var mazeMap;
var timer;

var directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ],
  init = function () {
    offset = pathWidth / 2 + outerWall;
    map = [];
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = outerWall * 2 + width * (pathWidth + wall) - wall;
    canvas.height = outerWall * 2 + height * (pathWidth + wall) - wall;
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = pathColor;
    ctx.lineCap = "square";
    ctx.lineWidth = pathWidth;
    ctx.beginPath();
    for (var i = 0; i < height * 2; i++) {
      map[i] = [];
      for (var j = 0; j < width * 2; j++) {
        map[i][j] = false;
      }
    }
    map[y * 2][x * 2] = true;

    route = [[x, y]];
    ctx.moveTo(
      x * (pathWidth + wall) + offset,
      y * (pathWidth + wall) + offset
    );
  };
init();

buttonRandomSeed = document.getElementById("randomButton");

buttonRandomSeed.addEventListener("click", function () {
  var selected = document.getElementById("selectForm");
  var selectedNumber = parseInt(selected.options[selected.selectedIndex].text);
  levels[8].maxBlocks = selectedNumber;

  paintMaze(selectedNumber);
  game.loadLevel(levels[(id = 8)]) + console.clear();
  capture();
});

capture = function () {
  canvas = document.querySelector("canvas");
  let image = document.getElementById("randomMazeImg");

  image.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    canvas.toDataURL("image/png")
  );
};
createFinish = function (noSameCoords) {
  var finish = document.getElementById("finish9");
  var finishPlace = noSameCoords[noSameCoords.length - 1];

  finishX = finishPlace[1] * 48 + 10;
  finishY = finishPlace[0] * 48 + 26; //16 siena, 48 kubas

  finish.setAttribute("x", finishY);
  finish.setAttribute("y", finishX);

  levels[8].game.marker = {
    x: finishPlace[0] - 3,
    y: (finishPlace[1] - 3) * -1,
  };
};
createTask = function (noSameCoords) {
  var taskPlace =
    noSameCoords[Math.floor(Math.random() * (noSameCoords.length - 3)) + 1];

  var aTask1 = Math.floor(Math.random() * (100 - 2 + 1)) + 2;
  var aTask2 = Math.floor(Math.random() * (100 - 2 + 1)) + 2;

  if (aTask1 < 10 && aTask2 < 10) {
    var operators = [
      {
        sign: "+",
        method: function (a, b) {
          return a + b;
        },
      },
      {
        sign: "-",
        method: function (a, b) {
          return a - b;
        },
      },
      {
        sign: "*",
        method: function (a, b) {
          return a * b;
        },
      },
    ];
  } else {
    var operators = [
      {
        sign: "+",
        method: function (a, b) {
          return a + b;
        },
      },
      {
        sign: "-",
        method: function (a, b) {
          return a - b;
        },
      },
    ];
  }

  var selectedOperator = Math.floor(Math.random() * operators.length);
  var answer = operators[selectedOperator].method(aTask1, aTask2);

  var taskString =
    String(aTask1) + operators[selectedOperator].sign + String(aTask2);

  var task1 = document.getElementById("task9");
  var task2 = document.getElementById("task9Question");
  task1X = taskPlace[0][1] * 48 + 40;
  task1Y = taskPlace[0][0] * 44 + 40; //16 siena, 48 kubas

  task1.setAttribute("x", task1Y);
  task1.setAttribute("y", task1X);

  task2.setAttribute("x", task1Y - 5);
  task2.setAttribute("y", task1X - 20);
  task2.textContent = taskString;

  levels[8].game.task = [
    {
      x: taskPlace[0][0] - 3,
      y: (taskPlace[0][1] - 3) * -1,
      rightAnswer: answer,
      optional: false,
    },
  ];
};

paintMaze = function (n) {
  init();

  ctx.moveTo(3 * pathWidth + offset, 3 * pathWidth + offset);
  ctx.lineTo(3 * pathWidth + offset, 3 * pathWidth + offset);

  ctx.stroke();

  var direction = directions[0];
  var startPosition = [3, 3];

  var fullListOfPaths;
  var message = "no question";
  var message2 = "with question";

  if (n > 3) {
    var paths = getRightPaths(n, startPosition, direction, message);
    var paths2 = getRightPaths(n - 2, startPosition, direction, message2);
    var paths3 = [];
    var paths4 = getRightPaths(n - 1, startPosition, direction, message2);

    for (var k = 0; k < paths2.length; k++) {
      if (paths2[k][0].includes("while")) {
        paths3.push(paths2[k]);
      }
    }
    for (var a = 0; a < paths4.length; a++) {
      if (paths4[a][0].includes("no while")) {
        paths3.push(paths4[a]);
      }
    }
    fullListOfPaths = paths.concat(paths3);
  } else {
    var paths = getRightPaths(n, startPosition, direction, message);
    fullListOfPaths = paths;
  }

  var randomItem =
    fullListOfPaths[Math.floor(Math.random() * fullListOfPaths.length)];
  // var randomItem = paths[55]; //40,42,44, 46, 49,51,53,55
  console.log(randomItem);
  var structuredPath = [];
  var noSameCoords = [];

  for (var i = 0; i < randomItem.length; i++) {
    var myX = randomItem[i][0][0] - 3;
    var myY;
    if (randomItem[i][0][1] - 3 != 0) {
      myY = (randomItem[i][0][1] - 3) * -1;
    } else myY = randomItem[i][0][1] - 3;

    structuredPath.push([myX, myY]);

    if (
      noSameCoords == [] ||
      !noSameCoords.some((a) => randomItem[i][0].every((v, m) => v === a[m]))
    ) {
      noSameCoords.push(randomItem[i][0]);
    }

    var drawX = randomItem[i][0][0];
    var drawY = randomItem[i][0][1];
    ctx.moveTo(drawX * pathWidth + offset, drawY * pathWidth + offset);
    ctx.lineTo(drawX * pathWidth + offset, drawY * pathWidth + offset);
    ctx.stroke();
  }

  var uniqueArray = structuredPath.filter(((t = {}), (a) => !(t[a] = a in t)));
  levels[8].game.path = uniqueArray;

  var whileIndex;
  var questionIndex;
  if (randomItem[0].length == 4) {
    whileIndex = 2;
    questionIndex = 3;
  }
  if (randomItem[0].length == 3) {
    whileIndex = 1;
    questionIndex = 2;
  }

  if (randomItem[0][questionIndex] == message2) {
    document.getElementById("task9").style.display = "block";
    createTask(randomItem);
    if (randomItem[0][whileIndex] == "no while") {
      levels[8].blocks = ["move", "turn", "answerBlock", "if_path_only_answer"];
    } else {
      levels[8].blocks = [
        "move",
        "turn",
        "answerBlock",
        "repeat_until",
        "if_path_only_answer",
      ];
    }
  } else if (randomItem[0][questionIndex] == message) {
    levels[8].game.task = [];
    document.getElementById("task9").style.display = "none";

    if (randomItem[0][whileIndex] == "no while") {
      levels[8].blocks = ["move", "turn"];
    } else {
      levels[8].blocks = ["move", "turn", "repeat_until"];
    }
  }

  createFinish(noSameCoords);
};

capture();
