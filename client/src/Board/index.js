export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array(height).fill(0).map(() => Array(width).fill(0));

    this.currentPiece = null;
    this.nextPiece = null;

    this.score = 0;
    this.gameOver = false;
  }
  enqueuePiece(piece) {
    this.updateBoard(this.currentPiece);
    this.currentPiece = this.nextPiece;
    this.nextPiece = piece;
    if (this.currentPiece) {
      this.checkForLineClear();
      this.currentPiece = new this.currentPiece(this.board);
      this.checkForGameOver();
    }
  }
  checkForGameOver() {
    if (this.currentPiece) {
      const {
        blockOne,
        blockTwo,
        blockThree,
        blockFour,
      } = this.currentPiece;
      if (this.board[blockOne[0]][blockOne[1]] !== 0 ||
        this.board[blockTwo[0]][blockTwo[1]] !== 0 ||
        this.board[blockThree[0]][blockThree[1]] !== 0 ||
        this.board[blockFour[0]][blockFour[1]] !== 0) {
        this.gameOver = true;
      }
    }
  }
  checkForLineClear() {
    const scores = [0, 10, 50, 100, 1000];
    const linesToClear = [];
    let clearedLines = 0;
    for (let row = 0; row < this.board.length; row += 1) {
      const emptySpaces = this.board[row].filter(cell => cell === 0).length;
      if (!emptySpaces) {
        clearedLines += 1;
        linesToClear.push(row);
      }
    }
    this.score = this.score + scores[clearedLines];
    this.clearLines(linesToClear);
  }
  clearLines(linesToClear) {
    linesToClear.forEach((lineIndex) => {
      this.board.splice(lineIndex, 1);
    });
    const newLines = Array(linesToClear.length).fill(0).map(() => Array(this.width).fill(0))
      .concat(this.board);
    this.board = newLines;
  }
  updateBoard(piece) {
    if (piece) {
      const {
        blockOne,
        blockTwo,
        blockThree,
        blockFour,
      } = piece;
      this.board[blockOne[0]][blockOne[1]] = piece.shape;
      this.board[blockTwo[0]][blockTwo[1]] = piece.shape;
      this.board[blockThree[0]][blockThree[1]] = piece.shape;
      this.board[blockFour[0]][blockFour[1]] = piece.shape;
    }
  }
}
