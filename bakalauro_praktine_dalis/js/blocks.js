forward = function (facing, currPosition) {
  // console.log("forward");
  var sum = currPosition.map(function (num, idx) {
    return num + facing[idx];
  });
  return [sum, facing];
};
left = function (facing, currPosition) {
  // console.log("left");
  for (var k = 0; k < directions.length; k++) {
    if (directions[k][0] == facing[0] && directions[k][1] == facing[1]) {
      if (k > 0) return [currPosition, directions[k - 1]];
      else return [currPosition, directions[directions.length - 1]];
    }
  }
};
right = function (facing, currPosition) {
  // console.log("right");
  for (var k = 0; k < directions.length; k++) {
    if (directions[k][0] == facing[0] && directions[k][1] == facing[1]) {
      if (k < directions.length - 1) return [currPosition, directions[k + 1]];
      else return [currPosition, directions[0]];
    }
  }
};
whileBlock = function (n, facing, currPosition, insideWhile) {
  // console.log("whileBlock");
  var currentPosition = currPosition;
  var currentFacing = facing;
  var loopCount = 0;
  var previousIter = null;
  var allCoordinates = [];

  if (insideWhile.length > 0) {
    if (
      !(
        insideWhile.length == 1 &&
        (insideWhile[0] == blocks2[1] || insideWhile[0] == blocks2[2])
      )
    ) {
      whileLoop: while (true) {
        loopCount += 1;

        for (var i = 0; i < insideWhile.length; i++) {
          [currentPosition, currentFacing] = insideWhile[i](
            currentFacing,
            currentPosition
          );
          allCoordinates.push(currentPosition);

          if (loopCount > n) {
            break whileLoop;
          }

          previousIter = currentPosition;
        }
        if (_.isEqual(currentPosition, currPosition)) {
          break whileLoop;
        }
      }
    }
  }
  return [currentPosition, currentFacing, allCoordinates];
};

var blocks2 = [forward, left, right, whileBlock];

isFinishNearby = function (path, start) {
  if (_.isEqual(path[path.length - 1], start)) {
    return true;
  }
  if (
    start[0] == path[path.length - 1][0] ||
    start[1] == path[path.length - 1][1]
  ) {
    if (start[0] == path[path.length - 1][0]) {
      if (
        start[1] == path[path.length - 1][1] + 1 ||
        start[1] == path[path.length - 1][1] - 1
      ) {
        return true;
      } else return false;
    }
    if (start[1] == path[path.length - 1][1]) {
      if (
        start[0] == path[path.length - 1][0] + 1 ||
        start[0] == path[path.length - 1][0] - 1
      ) {
        return true;
      } else return false;
    }
  } else return false;
};
isFinishNearby2 = function (path, start) {
  if (_.isEqual(path[path.length - 1][0], start)) {
    return true;
  }
  if (
    start[0] == path[path.length - 1][0][0] ||
    start[1] == path[path.length - 1][0][1]
  ) {
    if (start[0] == path[path.length - 1][0][0]) {
      if (
        start[1] == path[path.length - 1][0][1] + 1 ||
        start[1] == path[path.length - 1][0][1] - 1
      ) {
        return true;
      } else return false;
    }
    if (start[1] == path[path.length - 1][0][1]) {
      if (
        start[0] == path[path.length - 1][0][0] + 1 ||
        start[0] == path[path.length - 1][0][0] - 1
      ) {
        return true;
      } else return false;
    }
  } else return false;
};
isStraightLine = function (path) {
  var uniqueArray = path.filter(function (item, pos, self) {
    return _.isEqual(self.indexOf(item), pos);
  });
  m = uniqueArray.length - 1;
  var sub1 =
    (uniqueArray[m][1] - uniqueArray[m - 1][1]) /
    (uniqueArray[m][0] - uniqueArray[m - 1][0]);
  m--;
  while (m != 0) {
    var sub2 =
      (uniqueArray[m][1] - uniqueArray[m - 1][1]) /
      (uniqueArray[m][0] - uniqueArray[m - 1][0]);
    m--;
    if (sub2 == sub1) {
      continue;
    } else return false;
  }
  return true;
};
isThereACube = function (path) {
  var map = [];
  for (var i = 0; i < 7; i++) {
    map[i] = [];
    for (var j = 0; j < 7; j++) {
      map[i][j] = false;
    }
  }
  map[3][3] = true;
  if (Array.isArray(path[0][0])) {
    for (var i = 0; i < path.length; i++) {
      var x = path[i][0][0];
      var y = path[i][0][1];
      map[y][x] = true;
    }
  } else {
    for (var i = 0; i < path.length; i++) {
      var x = path[i][0];
      var y = path[i][1];
      map[y][x] = true;
    }
  }

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      if (
        map[i][j] == true &&
        map[i + 1][j] == true &&
        map[i][j + 1] == true &&
        map[i + 1][j + 1]
      ) {
        return true;
      }
    }
  }
  return false;
};
isTooLong = function (path) {
  if (Array.isArray(path[0][0])) {
    for (var i = 0; i < path.length; i++) {
      if (
        path[i][0][0] > 6 ||
        path[i][0][0] < 0 ||
        path[i][0][1] > 6 ||
        path[i][0][1] < 0
      ) {
        return true;
      }
    }
  } else {
    for (var i = 0; i < path.length; i++) {
      if (
        path[i][0] > 6 ||
        path[i][0] < 0 ||
        path[i][1] > 6 ||
        path[i][1] < 0
      ) {
        return true;
      }
    }
  }

  return false;
};

getVariants = function (n, ways) {
  var m = n;
  var newPossibleWays = [];

  if (m === 1) {
    return ways;
  }
  if (!Array.isArray(ways[0])) {
    m = m - 1;
  }

  for (var i = 0; i < ways.length; i++) {
    if (!Array.isArray(ways[i])) {
      for (var j = 0; j < ways.length; j++) {
        if ((ways[i] == blocks2[0] && j == 0) || ways[i] !== blocks2[j]) {
          if (
            (ways[i] == blocks2[1] && j == 2) ||
            (ways[i] == blocks2[2] && j == 1)
          )
            continue;
          else newPossibleWays.push([ways[i], blocks2[j]]);
        }
      }
    } else {
      var length = ways[i].length - 1;
      for (var j = 0; j < blocks2.length; j++) {
        if (
          (ways[i][length] == blocks2[0] && j == 0) ||
          ways[i][length] !== blocks2[j]
        ) {
          if (
            (ways[i][length] == blocks2[1] && j == 2) ||
            (ways[i][length] == blocks2[2] && j == 1) ||
            (ways[i].includes(blocks2[3]) && j == 3)
          )
            continue;
          else newPossibleWays.push([...ways[i], blocks2[j]]);
        }
      }
    }
  }

  if (m >= 2) {
    return getVariants(n - 1, newPossibleWays);
  } else return newPossibleWays;
};

getRightPaths = function (n, start, startDirection, message) {
  var variants = getVariants(n, blocks2);
  var currentPosition = start;
  var currentFacing = startDirection;
  var myPath;
  var myPaths = [];
  var allWhileCoords;
  var insideWhile;

  for (var i = 0; i < variants.length; i++) {
    myPath = [];
    var currentPosition = start;
    var currentFacing = startDirection;
    for (var j = 0; j < variants[i].length; j++) {
      if (variants[i][variants[i].length - 1] == blocks2[3]) {
        continue;
      }
      if (variants[i][0] == blocks2[3]) {
        insideWhile = [];
        for (var h = j + 1; h < variants[i].length; h++) {
          insideWhile.push(variants[i][h]);
        }
        [currentPosition, currentFacing, allWhileCoords] = whileBlock(
          n,
          currentFacing,
          currentPosition,
          insideWhile
        );

        if (
          (n > 2 &&
            !isFinishNearby(allWhileCoords, start) &&
            !isStraightLine(allWhileCoords) &&
            !isTooLong(allWhileCoords) &&
            !isThereACube(allWhileCoords)) ||
          n == 2
        ) {
          for (var w = 0; w < allWhileCoords.length; w++) {
            myPath.push([allWhileCoords[w], "while", message]);
          }
        }
        if (n > 3) {
          for (var t = n - 1; t > 1; t--) {
            var currentPosition = start;
            var currentFacing = startDirection;
            [currentPosition, currentFacing, allWhileCoords] = whileBlock(
              t,
              currentFacing,
              currentPosition,
              insideWhile
            );

            if (
              n > 2 &&
              !isFinishNearby(allWhileCoords, start) &&
              !isStraightLine(allWhileCoords) &&
              !isTooLong(allWhileCoords) &&
              !isThereACube(allWhileCoords)
            ) {
              for (var w = 0; w < allWhileCoords.length; w++) {
                myPath.push([allWhileCoords[w], "while", message]);
              }
            }
          }
        }

        break;
      }
      if (variants[i].length == 2) {
        if (variants[i][0] == blocks2[1] || variants[i][0] == blocks2[2]) {
          continue;
        }
      }
      if (variants[i][j] == blocks2[0]) {
        [currentPosition, currentFacing] = forward(
          currentFacing,
          currentPosition
        );
        myPath.push([currentPosition, currentFacing, "no while", message]);
      }
      if (variants[i][j] == blocks2[1]) {
        [currentPosition, currentFacing] = left(currentFacing, currentPosition);
        myPath.push([currentPosition, currentFacing, "no while", message]);
      }
      if (variants[i][j] == blocks2[2]) {
        [currentPosition, currentFacing] = right(
          currentFacing,
          currentPosition
        );
        myPath.push([currentPosition, currentFacing, "no while", message]);
      }
    }
    if (
      myPath.length != 0 &&
      !isFinishNearby2(myPath, start) &&
      !isTooLong(myPath) &&
      !isThereACube(myPath)
    )
      myPaths.push(myPath);
  }
  var myPathsCopy = [...myPaths];

  for (var k = 0; k < myPaths.length; k++) {
    if (myPaths[k].length > 1) {
      if (
        _.isEqual(
          myPaths[k][myPaths[k].length - 1][0],
          myPaths[k][myPaths[k].length - 2][0]
        )
      ) {
        myPathsCopy[k].pop();
      }
    }
  }
  var goodLengthArray = [];
  for (var l = 0; l < myPathsCopy.length; l++) {
    if (myPathsCopy[l].length >= n) {
      goodLengthArray.push(myPathsCopy[l]);
    }
  }

  if (n == 6) {
    var removeValFromIndex = [28, 30, 33, 35];
    for (var i = removeValFromIndex.length - 1; i >= 0; i--)
      goodLengthArray.splice(removeValFromIndex[i], 1);
  }
  if (n == 7) {
    var removeValFromIndex = [40, 42, 44, 46, 49, 51, 53, 55];
    for (var i = removeValFromIndex.length - 1; i >= 0; i--)
      goodLengthArray.splice(removeValFromIndex[i], 1);
  }
  return goodLengthArray;
};
