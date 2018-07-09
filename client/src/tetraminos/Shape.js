export default class Shape {
  constructor(board) {
    this.direction = 'north';
    this.row = 0;
    this.column = Math.floor(board[0].length / 2) - 1;
    this.shape = null;

    this.blockOne = null;
    this.blockTwo = null;
    this.blockThree = null;
    this.blockFour = null;

    this.board = board;
    this.newMoves = [];

    this.falling = true;
  }
  predictBlockLocations(move) {
    /* this function will be unique for every subclass
     * it exists here as a placeholder
     */
    const blockOne = [...this.blockOne];
    const blockTwo = [...this.blockTwo];
    const blockThree = [...this.blockThree];
    const blockFour = [...this.blockFour];
    return [blockOne, blockTwo, blockThree, blockFour];
  }
  checkIfMoveIsValid(move) {
    const { board } = this;
    this.newMoves = this.predictBlockLocations(move);
    const [one, two, three, four] = this.newMoves;
    return (
      board[one[0]] && (board[one[0]][one[1]] === 0) &&
      board[two[0]] && (board[two[0]][two[1]] === 0) &&
      board[three[0]] && (board[three[0]][three[1]] === 0) &&
      board[four[0]] && (board[four[0]][four[1]] === 0)
    );
  }
  commitMove(move) {
    const [one, two, three, four] = this.newMoves;
    this.blockOne = one;
    this.blockTwo = two;
    this.blockThree = three;
    this.blockFour = four;
    switch (move) {
      case 'descend':
        this.row = this.row + 1;
        break;
      case 'left':
        this.column = this.column - 1;
        break;
      case 'moveRight':
        this.column = this.column + 1;
        break;
      default:
        this.direction = move;
        break;
    }
    return true;
  }
  rotateAntiClockwise() {
    let newDirection;
    switch (this.direction) {
      case 'north':
        newDirection = 'west';
        break;
      case 'west':
        newDirection = 'south';
        break;
      case 'south':
        newDirection = 'east';
        break;
      case 'east':
        newDirection = 'north';
        break;
      default:
        newDirection = 'north';
    }
    return this.checkIfMoveIsValid(newDirection) && this.commitMove(newDirection);
  }
  rotateClockwise() {
    let newDirection;
    switch (this.direction) {
      case 'north':
        newDirection = 'east';
        break;
      case 'east':
        newDirection = 'south';
        break;
      case 'south':
        newDirection = 'west';
        break;
      case 'west':
        newDirection = 'north';
        break;
      default:
        newDirection = this.direction;
    }
    return this.checkIfMoveIsValid(newDirection) && this.commitMove(newDirection);
  }
  descend() {
    return this.checkIfMoveIsValid('descend') ? this.commitMove('descend') : this.stop();
  }
  moveLeft() {
    return this.checkIfMoveIsValid('left') && this.commitMove('left');
  }
  moveRight() {
    return this.checkIfMoveIsValid('right') && this.commitMove('right');
  }
  stop() {
    this.falling = false;
  }
}
