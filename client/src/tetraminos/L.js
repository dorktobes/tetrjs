import Shape from './Shape';
/* borrowed from Joe Snowden
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
  constructor(board) {
    super(board);
    this.shape = 'L';
    
    const { row, column } = this;
    this.blockOne = [row, column - 1];
    this.blockTwo = [row, column];
    this.blockThree = [row, column + 1];
    this.blockFour = [row + 1, column - 1];
  }
  predictBlockLocations(move) {
    const {
      row,
      column,
      blockOne,
      blockTwo,
      blockThree,
      blockFour,
    } = this;
    let one;
    let two;
    let three;
    let four;
    switch (move) {
      case 'north':
        one = [row, column - 1];
        two = [row, column];
        three = [row, column + 1];
        four = [row + 1, column - 1];
        break;
      case 'west':
        one = [row - 1, column - 1];
        two = [row, column - 1];
        three = [row + 1, column - 1];
        four = [row + 1, column];
        break;
      case 'south':
        one = [row, column + 1];
        two = [row + 1, column - 1];
        three = [row + 1, column];
        four = [row + 1, column + 1];
        break;
      case 'east':
        one = [row - 1, column - 1];
        two = [row - 1, column];
        three = [row, column];
        four = [row + 1, column];
        break;
      case 'descend':
        one = [blockOne[0] + 1, blockOne[1]];
        two = [blockTwo[0] + 1, blockTwo[1]];
        three = [blockThree[0] + 1, blockThree[1]];
        four = [blockFour[0] + 1, blockFour[1]];
        break;
      case 'left':
        one = [blockOne[0], blockOne[1] - 1];
        two = [blockTwo[0], blockTwo[1] - 1];
        three = [blockThree[0], blockThree[1] - 1];
        four = [blockFour[0], blockFour[1] - 1];
        break;
      case 'right':
        one = [blockOne[0], blockOne[1] + 1];
        two = [blockTwo[0], blockTwo[1] + 1];
        three = [blockThree[0], blockThree[1] + 1];
        four = [blockFour[0], blockFour[1] + 1];
        break;
      default:
        return [blockOne, blockTwo, blockThree, blockFour];
    }
    return [one, two, three, four];
  }
}
