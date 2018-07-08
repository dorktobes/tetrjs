export default class Board {
  constructor(width, height) {
    this.board = Array(height).fill(0).map(() => Array(width).fill(0));
    this.height = height;
    this.width = width;

    this.currentPiece = null;
    this.nextPiece = null;

    this.score = 0;
    this.gameOver = false;
  }
  enqueuePiece(piece) {
    this.currentPiece = this.nextPiece;
    this.nextPiece = piece;
  }
  checkForLineClear() {
    const scores = [0, 10, 50, 100, 1000];
    const linesToClear = [];
    const clearedLines = this.board.reduce((acc, row, i) => {
      if (row.reduce((count, cell) => count + cell) === row.length) {
        linesToClear.push(i);
        return acc + 1;
      }
      return acc;
    }, 0);
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
}
