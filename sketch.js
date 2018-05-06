const rows = 30,
  cols = 30;
const grid = new Grid(rows, cols);
grid.get(0).isStart = true;

function setup() {
  createCanvas(800, 600);

  const startCell = grid.get(0);
  const goalCell = makeRandomGoal(grid);
  // console.log(heuristic_cost_estimate(startCell , goalCell , cols))
  console.log(startCell, goalCell);
  aStar(startCell, goalCell, grid);
}

function draw() {
  background(0);
  drawGrid(grid);
  paintCells(grid);
}

function drawGrid(grid) {
  const rowHeight = height / rows;
  const colWidth = width / cols;
  // rows
  for (let i = 0; i < rows; i++) {
    stroke(255);
    line(0, rowHeight * i, width, rowHeight * i);
  }

  // cols
  for (let i = 0; i < cols; i++) {
    stroke(255);
    line(colWidth * i, 0, colWidth * i, height);
  }
}


function paintCells(grid) {
  const howManyCells = grid.cols * grid.rows;
  const rowHeight = height / rows;
  const colWidth = width / cols;
  for (let i = 0; i < howManyCells; i++) {
    const cell = grid.get(i);
    const [row, col] = calcCellRC(i, grid.cols);
    // console.log(row, col);
    const color = cellColorFactory(cell);
    fill(color);
    rect(col * colWidth, row * rowHeight, colWidth, rowHeight);
  }
}


function cellColorFactory(cell) {
  if (cell.isSeen && cell.isGoal)
    return 'red';
  if (cell.isStart)
    return 'yellow';
  if (cell.isPath)
    return 'blue';
  if (cell.isSeen)
    return '#9d6a4c';
  if (cell.isWall)
    return '#253452';
  if (cell.isGoal)
    return 'red';

  //default 
  return '#000000';

}

function makeRandomGoal(grid) {
  const howManyCells = grid.cols * grid.rows;
  const rIndex = floor(random(howManyCells));
  const rCell = grid.get(rIndex);
  rCell.isGoal = true;
  return rCell;
}