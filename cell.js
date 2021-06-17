class Cell {
  constructor(index) {
    this.index = index;
    this.isStart = false;
    this.isWall = false;
    this.isSeen = false;
    this.isPath = false;
    this.isGoal = false;
    this._neighbors = [];
  }
  setN(topN , rightN , bottomN , leftN ){
    this._neighbors.push(topN,rightN,bottomN,leftN);
  }
  neighbors() {
    // returns cell's neighbors
    return this._neighbors.slice();
  }

}


class BoundryCell extends Cell{
  constructor(index){
    super(index);
    this.isWall = true;
  }
}
