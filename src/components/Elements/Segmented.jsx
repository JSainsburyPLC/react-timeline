import React, { PropTypes } from 'react'

import { getDayMonth } from '../../utils/formatDate'

// eslint-disable-next-line no-unused-vars
const Segmented = ({ title, start, end, style, tooltip }) =>
  <div className="element" style={style}>
    <div className="element__content" aria-hidden="true">
      Segmented
    </div>
    <div className="element__tooltip">
      {
        tooltip
        ? <div>{tooltip}</div>
        : (
          <div>
            <div>Segmented</div>
            <div><strong>Start</strong> {getDayMonth(start)}</div>
            <div><strong>End</strong> {getDayMonth(end)}</div>
          </div>
        )
      }
    </div>
  </div>

Segmented.propTypes = {
  title: PropTypes.string,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  style: PropTypes.shape({}),
  tooltip: PropTypes.string
}

export default Segmented
