import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => (
  <td className={props.cell} />
);

Cell.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Cell;
