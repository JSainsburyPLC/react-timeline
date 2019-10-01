import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ time, title, start, end }) => (
  <div className="rt-timebar__cell" style={time.toStyleLeftAndWidth(start, end)}>
    {title}
  </div>
)

Cell.propTypes = {
  time: PropTypes.shape({
    toStyleLeftAndWidth: PropTypes.func,
  }),
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
}

export default Cell
