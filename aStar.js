function aStar(startCell, goalCell, grid) {
  const howManyCells = grid.rows * grid.cols;
  // The set of nodes already evaluated
  const closedSet = {};// index => cell

  // The set of currently discovered nodes that are not evaluated yet.
  // Initially, only the start node is known.
  const openSet = {};
  openSet[startCell.index] = startCell;

  // For each node, which node it can most efficiently be reached from.
  // If a node can be reached from many nodes, cameFrom will eventually contain the
  // most efficient previous step.
  const cameFrom = {};

  // For each node, the cost of getting from the start node to that node.
  const gScore = initScores(howManyCells);
  // The cost of going from start to start is zero.
  gScore[startCell.index] = 0;

  // For each node, the total cost of getting from the start node to the goal
  // by passing by that node. That value is partly known, partly heuristic.
  const fScore = initScores(howManyCells);

  // For the first node, that value is completely heuristic.
  fScore[startCell.index] = heuristic_cost_estimate(startCell, goalCell, grid.cols);


  while (Object.keys(openSet).length > 0) {
    const cellIndexWithLowestFScore = lowestFScore(openSet, fScore);

    const currentCell = grid.get(cellIndexWithLowestFScore);
    if (currentCell === undefined) return console.error('why');

    if (currentCell.index === goalCell.index) {
      return reconstruct_path(cameFrom, currentCell);
    }

    delete openSet[currentCell.index];
    closedSet[currentCell.index] = currentCell;

    const currentCellNeighbors = currentCell.neighbors();// returns [top , right , bottom , left]

    for (let neighbor of currentCellNeighbors) {
      if (neighbor instanceof BoundryCell) continue;
      if (closedSet[neighbor.index] !== undefined)
        continue;		// Ignore the neighbor which is already evaluated.
      neighbor.isSeen = true;
      if (openSet[neighbor.index] === undefined)	// Discover a new node
        openSet[neighbor.index] = neighbor;

      // The distance from start to a neighbor
      //the "dist_between" function may vary as per the solution requirements.
      const tentative_gScore = gScore[currentCell.index] + dist_between(currentCell, neighbor);
      if (tentative_gScore >= gScore[neighbor.index])
        continue;		// This is not a better path.

      // This path is the best until now. Record it!
      cameFrom[neighbor.index] = currentCell;
      gScore[neighbor.index] = tentative_gScore;
      fScore[neighbor.index] = gScore[neighbor.index] + heuristic_cost_estimate(neighbor, goalCell, grid.cols);
    }
  }

  return new Error("Couldn't find any path");
}

function lowestFScore(openSets, fScores) {
  const keys = Object.keys(openSets);
  let lowestVal = Number.MAX_SAFE_INTEGER;
  let lowestKey = undefined;
  for (let key of keys) {
    const score = fScores[key];
    // console.log(key,score);
    if (score <= lowestVal) {
      lowestVal = score;
      lowestKey = key;
    }
  }
  return lowestKey;
}
function initScores(howManyCells) {
  const scores = {};
  for (let i = 0; i < howManyCells; i++) {
    scores[i] = Number.MAX_SAFE_INTEGER;
  }
  return scores;
}
function dist_between(fromCell, toNeighbor) {
  return 1;
}
function heuristic_cost_estimate(fromCell, toCell, gridCols) {
  const [x0, y0] = calcCellRC(fromCell.index, gridCols);
  const [x1, y1] = calcCellRC(toCell.index, gridCols);
  // console.log(x0,y0);
  // console.log(x1,y1);
  const deltaX = x1 - x0;
  const deltaY = y1 - y0;

  return Math.sqrt((Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
}

function reconstruct_path(cameFrom, currentCell) {
  // const currentCellNeighbors = currentCell.neighbors();
  // console.log('-------')
  // console.log(currentCell);
  // console.log(currentCellNeighbors);
  // console.log('\n\n');
  // return;
  // for (let neighbor of currentCellNeighbors) {
  //   if(neighbor instanceof BoundryCell) continue;
  //   if(neighbor.isPath) continue;
  //   if(neighbor.isGoal) continue;
  //   const cell = cameFrom[neighbor.index];
  //   console.log(cell);
  //   if (cell) {
  //     neighbor.isPath = true;
  //     if (neighbor.isStart) return;
  //     return reconstruct_path(cameFrom, neighbor);
  //   }
  // }
  const keys = Object.keys(cameFrom);
  for (let key of keys) {
    const cell = cameFrom[key];
    cell.isPath = true;
  }
}