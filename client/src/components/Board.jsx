import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

const Board = props => (
  <table>
    <tbody>
      {props.board.map((row, i) => <Row key={`row${i + JSON.stringify(row)}`}row={row} />)}
    </tbody>
  </table>
);
Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};

export default Board;
