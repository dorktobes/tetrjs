import React from 'react';
import PropTypes from 'prop-types';

const HighScore = ({ name, score }) => (
  <li>
    <span className="name">{name}</span>
    <span className="score">{score}</span>
  </li>
);

HighScore.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default HighScore;
