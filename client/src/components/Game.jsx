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
import NewGame from './NewGame';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new BoardClass(10, 22),
      pieces: [I, J, L, O, S, T, Z],
      currentPiece: null,
      timeoutID: null,
      gameOver: false,
    };
    this.startNewGame = this.startNewGame.bind(this);
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
      case 'KeyS':
      case 'ArrowDown':
        this.state.currentPiece.descend();
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
        const timeoutID = setTimeout(this.dropPiece.bind(this), 300);
        this.setState({ timeoutID });
      } else {
        this.enqueueNewPiece();
        setTimeout(this.dropPiece.bind(this), 300);
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
  startNewGame() {
    const board = new BoardClass(10, 22);
    const currentPiece = null;
    const timeoutID = null;
    const gameOver = false;
    this.setState({
      board,
      currentPiece,
      timeoutID,
      gameOver,
    }, this.dropPiece);
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
      <div className="main">
        <Board board={this.generateBoard().slice(2)} />
        <div>
          <ScoreBoard score={this.state.board.score} />
          <NextPiece Piece={this.state.board.nextPiece} />
          {this.state.gameOver ? <NewGame startNewGame={this.startNewGame} /> : ''}
        </div>
      </div>
    );
  }
}

export default Game;
