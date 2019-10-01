import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({ time, grid }) => (
  <div className="rt-grid">
    {grid.map(({ id, start, end }) => (
      <div key={id} className="rt-grid__cell" style={time.toStyleLeftAndWidth(start, end)} />
    ))}
  </div>
)

Grid.propTypes = {
  time: PropTypes.shape({
    toStyleLeftAndWidth: PropTypes.func,
  }).isRequired,
  grid: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
}

export default Grid
