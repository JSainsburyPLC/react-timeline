import React from 'react'
import PropTypes from 'prop-types'

import createClasses from '../../../utils/classes'

const Cell = ({ time, title, start, end, classes }) => (
  <div className={createClasses('rt-timebar__cell', classes)} style={time.toStyleLeftAndWidth(start, end)}>
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
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default Cell
