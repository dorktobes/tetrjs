import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NewGame = props => (
  <button onClick={props.startNewGame}>
    New Game
  </button>
);

NewGame.propTypes = {
  startNewGame: PropTypes.func.isRequired,
};

export default NewGame;
