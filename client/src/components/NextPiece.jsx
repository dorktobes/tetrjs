import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';

class NextPiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      ],
    };
  }
  renderPieceToBoard() {
    const updatedBoard = this.state.board.slice().map(row => [...row]);
    const piece = new this.props.Piece(updatedBoard);
    const {
      blockOne,
      blockTwo,
      blockThree,
      blockFour,
      shape,
    } = piece;
    updatedBoard[blockOne[0]][blockOne[1]] = shape;
    updatedBoard[blockTwo[0]][blockTwo[1]] = shape;
    updatedBoard[blockThree[0]][blockThree[1]] = shape;
    updatedBoard[blockFour[0]][blockFour[1]] = shape;
    return updatedBoard;
  }
  render() {
    this.renderPieceToBoard();
    return (
      <div>
        <Board board={this.renderPieceToBoard()} />
      </div>
    );
  }
}

NextPiece.propTypes = {
  Piece: PropTypes.func.isRequired,
};

export default NextPiece;
