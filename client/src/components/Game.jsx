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
import NextPiece from './NextPiece';
import ScoreBoard from './ScoreBoard';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new BoardClass(8, 15),
      pieces: [I, J, L, O, S, T, Z],
      currentPiece: null,
      timeoutID: null,
      gameOver: false,
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
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  getRandomPiece() {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.state.pieces.length));
    return this.state.pieces[randomIndex];
  }
  handleKeyDown(e) {
    switch (e.code) {
      case 'KeyA':
      case 'ArrowLeft':
        this.state.currentPiece.moveLeft();
        this.forceUpdate();
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.state.currentPiece.moveRight();
        this.forceUpdate();
        break;
      case 'KeyQ':
        this.state.currentPiece.rotateAntiClockwise();
        this.forceUpdate();
        break;
      case 'KeyE':
        this.state.currentPiece.rotateClockwise();
        this.forceUpdate();
        break;
      default:
        break;
    }
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
    if (!this.state.board.gameOver) {
      this.state.currentPiece.descend();
      if (this.state.currentPiece.falling) {
        const timeoutID = setTimeout(this.dropPiece.bind(this), 400);
        this.setState({ timeoutID });
      } else {
        this.enqueueNewPiece();
        setTimeout(this.dropPiece.bind(this), 400);
      }
    } else {
      this.setState({ gameOver: true });
    }
  }
  enqueueNewPiece() {
    const newPiece = this.getRandomPiece();
    this.state.board.enqueuePiece(newPiece);
    if (this.state.board.gameOver) {
      clearTimeout(this.state.timeoutID);
      this.setState({ gameOver: true });
    } else {
      this.setState({ currentPiece: this.state.board.currentPiece });
    }
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
        <ScoreBoard score={this.state.board.score} />
        <NextPiece Piece={this.state.board.nextPiece} />
      </div>
    );
  }
}

export default Game;
