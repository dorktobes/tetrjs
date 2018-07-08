import Shape from './Shape';
/* borrowed from Joe Snowden
 * NORTH, WEST, SOUTH, EAST
 * 🔄🐯
 * 🐯🐯
 */

export default class O extends Shape {
  constructor(board) {
    super(board);
    const { row, column } = this;
    this.hub = [row, column];
    this.blockOne = [row, column + 1];
    this.blockTwo = [row, column];
    this.blockThree = [row + 1, column + 1];
    this.blockFour = [row + 1, column];
  }
  predictBlockLocations(move) {
    const {
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
