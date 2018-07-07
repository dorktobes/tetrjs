export default class Shape {
  constructor() {
    this.direction = 'north';
    this.row = 0;
    this.column = 3;

    this.hub = null;
    this.blockOne = null;
    this.blockTwo = null;
    this.blockThree = null;
    this.blockFour = null;

    this.falling = true;
  }
  updateBlocks() {
    /* this function will be unique for every subclass
     * it exists here as a placeholder
     */
    this.blockOne = null;
    this.blockTwo = null;
    this.blockThree = null;
    this.blockFour = null;
    return null;
  }
  rotate() {
    switch (this.direction) {
      case 'north':
        this.direction = 'west';
        break;
      case 'west':
        this.direction = 'south';
        break;
      case 'south':
        this.direction = 'east';
        break;
      case 'east':
        this.direction = 'north';
        break;
      default:
        this.direction = 'north';
    }
    this.updateBlocks();
  }
  descend() {
    this.row = this.row + 1;
    this.updateBlocks();
  }
  moveLeft() {
    this.column = this.column - 1;
    this.updateBlocks();
  }
  moveRight() {
    this.column = this.column + 1;
    this.updateBlocks();
  }
  stop() {
    this.falling = false;
  }
}
