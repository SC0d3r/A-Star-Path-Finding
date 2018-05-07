const rows = localStorage.getItem('__gridRows__') || 10;
const cols = localStorage.getItem('__gridCols__') || 10;

const shouldAnimate = localStorage.getItem('__shouldAnimate__') === 'true';

const grid = new Grid(rows, cols);
grid.get(0).isStart = true;
let goalCell;
function setup() {
  createCanvas(800, 600);
  const startCell = grid.get(0);
  goalCell = makeRandomGoal(grid);
  makeRandomWall(grid);

  if (shouldAnimate) {
    setTimeout(() => {
      animateAStar(startCell, goalCell, grid);
    }, 1);
  } else {
    aStar(startCell, goalCell, grid);
  }
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
    const color = cellColorFactory(cell);
    fill(color);
    rect(col * colWidth, row * rowHeight, colWidth, rowHeight);
  }
}


function cellColorFactory(cell) {
  if (cell.isWall)
    return '#a534a2';
  if (cell.isGoal)
    return 'red';
  if (cell.isStart)
    return 'yellow';
  if (cell.isPath)
    return 'blue';
  if (cell.isSeen)
    return '#9d6a4c';

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


function makeRandomWall(grid) {
  const howManyCells = grid.cols * grid.rows;
  const howManyWalls = floor(random(howManyCells / 2));
  for (let i = 0; i < howManyWalls; i++) {
    const rIndex = floor(random(howManyCells));
    if (rIndex === 0 || rIndex === goalCell.index) continue;
    const rCell = grid.get(rIndex);
    rCell.isWall = true;
  }
}