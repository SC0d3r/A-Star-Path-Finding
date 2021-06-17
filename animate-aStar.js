function animateAStar(startCell, goalCell, grid) {
  const howManyCells = grid.rows * grid.cols;
  const closedSet = {};

  const openSet = {};
  openSet[startCell.index] = startCell;

  const cameFrom = {};

  const gScore = initScores(howManyCells);
  gScore[startCell.index] = 0;

  const fScore = initScores(howManyCells);
  fScore[startCell.index] = heuristic_cost_estimate(startCell, goalCell, grid.cols);

  const res = (function _x_(){
    if(Object.keys(openSet).length <= 0) return -1;

    const cellIndexWithLowestFScore = lowestFScore(openSet, fScore);
  
    const currentCell = grid.get(cellIndexWithLowestFScore);
    if (currentCell === undefined) return console.error('why');
  
    if (currentCell.index === goalCell.index) {
      return reconstruct_path(cameFrom, currentCell);
    }
  
    delete openSet[currentCell.index];
    closedSet[currentCell.index] = currentCell;
  
    const currentCellNeighbors = currentCell.neighbors();
  
    for (let neighbor of currentCellNeighbors) {
  
      if (neighbor instanceof BoundryCell) continue;
      if(neighbor.isWall) continue;
  
      if (closedSet[neighbor.index] !== undefined)
        continue;
  
      neighbor.isSeen = true;
      if (openSet[neighbor.index] === undefined)
        openSet[neighbor.index] = neighbor;

      const tentative_gScore = gScore[currentCell.index] + dist_between(currentCell, neighbor);
      if (tentative_gScore >= gScore[neighbor.index])
        continue;		
      cameFrom[neighbor.index] = currentCell;
      gScore[neighbor.index] = tentative_gScore;
      fScore[neighbor.index] = gScore[neighbor.index] + heuristic_cost_estimate(neighbor, goalCell, grid.cols);
    }
    setTimeout(() => _x_() , 10);
  }());

  return res || new Error("Ooops");
}
