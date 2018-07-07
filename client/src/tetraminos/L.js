import Shape from './Shape';
/*
 * NORTH
 * 🐯🔄🐯
 * 🐯️️
 * WEST
 * 🐯
 * 🐯🔄
 * 🐯🐯
 * SOUTH
 * ◽️🔄️🐯
 * 🐯🐯🐯
 * EAST
 * 🐯🐯
 * ◽️🔄
 * ◽️🐯
 */

export default class L extends Shape {
  constructor() {
    super();
    const [row, column] = this;
    this.hub = [row, column];
    this.blockOne = [row, column - 1];
    this.blockTwo = [row, column];
    this.blockThree = [row, column + 1];
    this.blockFour = [row + 1, column - 1];
  }
  updateBlocks() {
    const [row, column] = this;
    switch (this.direction) {
      case 'north':
        this.hub = [row, column];
        this.blockOne = [row, column - 1];
        this.blockTwo = [row, column];
        this.blockThree = [row, column + 1];
        this.blockFour = [row + 1, column - 1];
        break;
      case 'west':
        this.hub = [row + 1, column];
        this.blockOne = [row, column - 1];
        this.blockTwo = [row + 1, column - 1];
        this.blockThree = [row + 2, column - 1];
        this.blockFour = [row + 2, column];
        break;
      case 'south':
        this.hub = [row, column];
        this.blockOne = [row, column + 1];
        this.blockTwo = [row + 1, column - 1];
        this.blockThree = [row + 1, column];
        this.blockFour = [row + 1, column + 1];
        break;
      case 'east':
        this.hub = [row + 1, column];
        this.blockOne = [row, column - 1];
        this.blockTwo = [row, column];
        this.blockThree = [row + 1, column];
        this.blockFour = [row + 2, column];
        break;
      default:
        this.direction = 'north';
    }
  }
}
