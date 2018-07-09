import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const Row = props => (
  <tr>
    {props.row.map((cell, i) => <Cell key={`row${JSON.stringify(props.row)}cell${i} ${cell}`} cell={cell} />)}
  </tr>
);
Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default Row;
