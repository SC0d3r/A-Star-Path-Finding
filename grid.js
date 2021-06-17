class Grid {
  constructor(rows, cols) {
    this.rows = rows || 2;
    this.cols = cols || 2;
    this._cells = [];
    this._init();
  }
  get(index) {
    return this._cells[index];
  }
  _init() {
    let n = this.cols * this.rows;

    // create cells
    for (let i = 0; i < n; i++) {
      const newCell = new Cell(i);
      this._cells.push(newCell);
    }

    //bcell is for boundries of grid (for avoiding undefined)
    const bCell = new BoundryCell(-1);
    
    // connect cells to their neighbors
    for (let i = 0; i < n; i++) {
      const cell = this._cells[i];
      const [cellRow, cellCol] = calcCellRC(i, this.cols);
      const topNCell = this._cells[toIndex(cellRow - 1, cellCol, this.cols)];
      const rightNCell = this._cells[toIndex(cellRow, cellCol + 1, this.cols)];
      const bottomNCell = this._cells[toIndex(cellRow + 1, cellCol, this.cols)];
      const leftNCell = this._cells[toIndex(cellRow, cellCol - 1, this.cols)];
      cell.setN(topNCell || bCell,
        rightNCell || bCell,
        bottomNCell || bCell,
        leftNCell || bCell);
    }
  }
}

function calcCellRC(index, cols) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  return [row, col];
}

function toIndex(row, col, cols) {
  if (row < 0 || col < 0) return -1;
  if (col >= cols) return -1;
  return row * cols + col;
}