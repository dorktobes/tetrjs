import React, { Component } from 'react';

import BoardClass from '../Board';
import I from '../tetraminos/I';
import J from '../tetraminos/J';
import L from '../tetraminos/L';
import O from '../tetraminos/O';
import S from '../tetraminos/S';
import T from '../tetraminos/T';
import Z from '../tetraminos/Z';

import Board from './Board';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new BoardClass(6, 10),
      pieces: [I, J, L, O, S, T, Z],
      currentPiece: null,
      timeoutID: null,
    };
  }
  componentDidMount() {
    if (!this.state.currentPiece) {
      /* if there is no current piece, then the game hasn't started.
       * We queue up a first piece and the next in line
       */
      this.state.board.enqueuePiece(this.getRandomPiece());
      this.state.board.enqueuePiece(this.getRandomPiece());
      this.state.setState({ currentPiece: this.state.board.currentPiece }, this.dropPiece);
    } else {
      this.dropPiece();
    }
  }
  getRandomPiece() {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.state.pieces.length));
    return this.state.pieces[randomIndex];
  }
  generateBoard() {
    const updatedBoard = this.state.board.board.slice().map(row => [...row]);
    const {
      blockOne,
      blockTwo,
      blockThree,
      blockFour,
      shape,
    } = this.state.currentPiece;
    updatedBoard[blockOne[0]][blockOne[1]] = shape;
    updatedBoard[blockTwo[0]][blockTwo[1]] = shape;
    updatedBoard[blockThree[0]][blockThree[1]] = shape;
    updatedBoard[blockFour[0]][blockFour[1]] = shape;
    return updatedBoard;
  }
  dropPiece() {
    this.state.currentPiece.descend();
    if (this.state.currentPiece.falling) {
      const timeoutID = setTimeout(this.dropPiece.bind(this), 400);
      this.setState({ timeoutID });
    } else {
      this.enqueueNewPiece();
      setTimeout(this.dropPiece.bind(this), 400);
    }
  }
  enqueueNewPiece() {
    const newPiece = this.getRandomPiece();
    this.state.board.enqueuePiece(newPiece);
    this.setState({ currentPiece: this.state.board.currentPiece });
  }
  render() {
    if (!this.state.currentPiece) {
      /* if there is no current piece, then the game hasn't started.
       * We queue up a first piece and the next in line
       */
      this.state.board.enqueuePiece(this.getRandomPiece());
      this.state.board.enqueuePiece(this.getRandomPiece());
      this.state.currentPiece = this.state.board.currentPiece;
    }
    return (
      <div>
        <Board board={this.generateBoard()} />
      </div>
    );
  }
}

export default Game;
