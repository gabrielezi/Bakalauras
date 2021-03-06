/* --- Game class --- */
//
// this class:
//  - manage the requests
//  - update the game (json)
//  - manage the gui
//  - load the levels

Blockly.JavaScript["answerBlock"] = function (block) {
  let value = block.getFieldValue("answerValue"),
    request = Blockly.Gamepad.utils.request("ANSWER", [value], block.id);

  return request;
};

class Game {
  // the gamepad is passed to the contructor
  constructor(gui, gamepad) {
    // link the game
    gamepad.setGame(this, this.manageRequest);

    // set the gamepad and the gui
    this.gamepad = gamepad;
    this.gui = gui;
    this.onATask;
    this.rightAnswer;
    this.wasOnTask = [];
    this.usersAnswer = [];
  }

  /* --- Game handlers --- */

  // all the requests are passed to this function
  manageRequest(request, back, old) {
    let result, promise;

    // if a method is called and the request is not old the game is updated
    //
    // using the 'magicJson' options the json need to be changed only the first
    // time the request is passed to this function
    //
    // if the request is old the json will be automatically updated before the request is passed
    // to this function
    //
    // infact, in the methods's handlers below, the 'back' argument is not passed
    // and there's no code to remove the changes of the json on back requests
    if (
      ["PATH", "REPEAT", "TURN", "MOVE", "ANSWER"].includes(request.method) &&
      !old
    )
      // update the game
      result = this[request.method].apply(
        this,
        [].concat(request.args, request)
      );

    // check the game status
    this.checkGameStatus(request, back, old);

    // update the gui
    promise = this.gui.manageRequest(request, back);
    // you can return a promise
    return promise.then(() => result);
  }

  // load a level
  loadLevel(level) {
    if (level != levels[(id = 8)])
      document.getElementById("newLevelDiv").style.display = "none";
    // update maxBlocks setting
    if ("maxBlocks" in level)
      // if the start block is used add 1
      Blockly.getMainWorkspace().options.maxBlocks =
        level.maxBlocks + (start ? 1 : 0);
    // no max
    else Blockly.getMainWorkspace().options.maxBlocks = Infinity;

    // update the toolbox
    if ("blocks" in level)
      // load some blocks/categories from the xml
      this.gamepad.setToolbox({
        blocks: level.blocks,
      });
    // load all the blocks/categories from the xml
    else
      this.gamepad.setToolbox({
        all: true,
      });

    // update the magicJson
    this.gamepad.level = level.game;
    // set the id
    this.id = level.id;

    // load the gui
    this.gui.load(this.id);
    // reset the workspace and kill the requests of the previous game if it wasn't finished
    this.gamepad.reset();
    // restore the old code from the localStorage
    this.gamepad.restore("" + this.id + start);

    this.onATask = undefined;
    this.rightAnswer = undefined;
    this.wasOnTask = [];
    this.usersAnswer = [];
  }

  // load the code
  loadCode() {
    // load the code, the json is resetted
    this.gamepad.load();
    // save the code in localStorage
    this.gamepad.save("" + this.id + start);
    // reset the gui
    this.gui.load();
    // load first 'START' request
    this.gamepad.forward();
  }
  //----------------------------------------------
  onTask(request, right) {
    if (typeof this.usersAnswer[this.wasOnTask.length - 1].answer === "string")
      this.usersAnswer[this.wasOnTask.length - 1].answer =
        this.usersAnswer[this.wasOnTask.length - 1].answer.toLowerCase();
    if (this.usersAnswer[this.wasOnTask.length - 1].answer == right) {
      this.usersAnswer[this.wasOnTask.length - 1].done = true;
      console.log("the answer is correct");
    } else {
      request.method = "FINISHED";
      alert("Pralaim??jai! Atsakymas neteisingas");
    }
  }

  /* --- Game utils --- */

  // check the game status
  checkGameStatus(request, back, old) {
    this.onATask = false;

    let pegman = this.gamepad.level.pegman,
      marker = this.gamepad.level.marker,
      taskPlace = this.gamepad.level.task;

    if (request.method == Blockly.Gamepad["STATES"]["STARTED"]) {
      this.usersAnswer = [];
    }
    // if the game is finished show win/lose alert
    if (request.method == Blockly.Gamepad["STATES"]["FINISHED"] && !back) {
      if (pegman.x == marker.x && pegman.y == marker.y) {
        if (
          this.usersAnswer.length >=
          taskPlace.filter((obj) => obj.optional === false).length
        ) {
          var addPoints = this.usersAnswer.length;
          if (addPoints == 0) {
            addPoints = 1;
          }
          document.getElementById("points").innerHTML =
            parseInt(document.getElementById("points").textContent) + addPoints;
          alert("Puiku, laim??jai!");
        } else alert("Pralaim??jai! N??ra pakankamai atsakym??");
      } else alert("Pralaim??jai!");
    }
    if (
      taskPlace.filter((e) => e.x === pegman.x && e.y === pegman.y).length > 0
    ) {
      // if the request is ANSWER
      if (request.method == "ANSWER") {
        this.usersAnswer.push({ answer: request.args[0], done: false });

        var right = taskPlace.filter(
          (e) => e.x === pegman.x && e.y === pegman.y
        )[0].rightAnswer;

        this.onTask(request, right);
      }
      if (
        this.wasOnTask.filter((e) => e.x === pegman.x && e.y === pegman.y)
          .length == 0
      ) {
        var pegmanX = pegman.x;
        var pegmanY = pegman.y;
        this.wasOnTask.push({ x: pegmanX, y: pegmanY });
      }
    }
    if (
      request.method == "ANSWER" &&
      taskPlace.filter((e) => e.x === pegman.x && e.y === pegman.y).length == 0
    ) {
      request.method = "FINISHED";
      alert("Pralaim??jai! Klaidinga atsakymo vieta");
    }

    // log the request and the pegman
    // the pegman is parsed to look better in the console because gamepad.level is not a normal object (see documentation)
    console.group();
    console.info("request:      ", request);
    console.info("request type: ", back ? "backward" : "forward");
    console.info("request age:  ", old ? "old" : "new");
    console.info("\n");
    console.info("pegman:       ", JSON.parse(JSON.stringify(pegman)));
    console.groupEnd();
  }

  // get the { x, y } offset of the next position
  // from a given direction
  getNextPosition(direction) {
    // the direction is one of these inputs
    //
    // Blockly.Gamepad['INPUTS'] = {
    //    'FORWARD': '0',
    //    'RIGHT': '1',
    //    'BACKWARD': '2',
    //    'LEFT': '3'
    // }

    return [
      {
        // UP
        x: 0,
        y: 1,
      },
      {
        // RIGHT
        x: 1,
        y: 0,
      },
      {
        // DOWN
        x: 0,
        y: -1,
      },
      {
        // LEFT
        x: -1,
        y: 0,
      },
    ][direction];
  }

  // check if the pegman can update its position
  // from the given offset
  canMove(path, pegman, position) {
    let x = pegman.x + position.x,
      y = pegman.y + position.y;

    // check if the path exist
    return (
      path.find((element) => element[0] == x && element[1] == y) != undefined
    );
  }
  isOnATask(path, pegman, position, task) {
    if (task.filter((e) => e.x === pegman.x && e.y === pegman.y).length > 0) {
      return true;
    } else return false;
  }

  /* --- Game methods --- */
  //
  // with the 'magicJson' options these methods will be called only if the
  // request is not old
  //
  // infact in these methods there's no code to change the json on back requests
  // because it will be automatically updated on all the old requests

  // 'repeat until' method
  ANSWER(request) {
    let pegman = this.gamepad.level.pegman,
      marker = this.gamepad.level.marker;
    return {
      return: pegman.x != marker.x || pegman.y != marker.y,
    };
  }
  REPEAT() {
    let pegman = this.gamepad.level.pegman,
      marker = this.gamepad.level.marker;

    // the return: value
    // if true the cycle continues, otherwise it stops
    // while ( value ) {...}
    return {
      return: pegman.x != marker.x || pegman.y != marker.y,
    };
  }

  // 'if path' methods
  PATH(direction) {
    let path = this.gamepad.level.path,
      pegman = this.gamepad.level.pegman,
      task = this.gamepad.level.task,
      position;
    // because of the directions's values range from 0 to 3
    // it's possible to use the direction as an offset and then use the modulus
    // (direction is a string so it's parsed)
    //
    // Blockly.Gamepad['INPUTS'] = {
    //    'FORWARD': '0',
    //    'RIGHT': '1',
    //    'BACKWARD': '2',
    //    'LEFT': '3'
    //}
    var couldMove;
    if (direction < 4) {
      position = this.getNextPosition((pegman.direction + direction) % 4);
      couldMove = this.canMove(path, pegman, position);
    } else {
      position = { x: 0, y: 0 };
      couldMove = this.isOnATask(path, pegman, position, task);
    }
    console.log(couldMove);
    // the return: value
    // if ( value ) {...} else {...}
    return {
      return: couldMove,
    };
  }

  // 'move forward' method
  MOVE(request) {
    let path = this.gamepad.level.path,
      pegman = this.gamepad.level.pegman,
      position = this.getNextPosition(pegman.direction),
      canMove = this.canMove(path, pegman, position);

    // if the pegman can move the position is updated
    if (canMove) {
      pegman.x += position.x;
      pegman.y += position.y;
    }

    // decorate the request with some data
    // this data will be used in the gui
    request.data = [
      // if the pegman has moved
      canMove,
      // the direction of the pegman
      pegman.direction,
    ];
  }

  // 'turn' method
  TURN(direction, request) {
    // because of the directions's values range from 0 to 3
    // it's possible to increment the value and then use the modulus
    //
    // Blockly.Gamepad['INPUTS'] = {
    //    'FORWARD': '0',
    //    'RIGHT': '1',
    //    'BACKWARD': '2',
    //    'LEFT': '3'
    // }
    this.gamepad.level.pegman.direction += direction;
    this.gamepad.level.pegman.direction %= 4;

    // decorate the request with some data
    // the data will be used in the gui
    request.data = [
      // if the rotation is in a clockwise direction
      direction == Blockly.Gamepad["INPUTS"]["RIGHT"],
    ];
  }
}
