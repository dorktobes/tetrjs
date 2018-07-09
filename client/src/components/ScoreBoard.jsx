import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = props => (
  <div>
    Score: <em>{props.score}</em>
  </div>
);

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreBoard;
