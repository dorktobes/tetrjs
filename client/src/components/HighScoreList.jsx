import React from 'react';
import PropTypes from 'prop-types';

import HighScore from './HighScore';

const HighScoreList = ({ highScores }) => (
  <div>
    <h4> High Scores </h4>
    <ul>
      {highScores.map(({ name, score }) => <HighScore name={name} score={score} />)}
    </ul>
  </div>
);

HighScoreList.propTypes = {
  highScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
};

export default HighScoreList;
