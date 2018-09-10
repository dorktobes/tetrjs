import React from 'react';

import Game from './Game';
import withHighScore from './withHighScore';

const GameWithHighScore = withHighScore(Game);

const App = () => (
  <GameWithHighScore />
);

export default App;
