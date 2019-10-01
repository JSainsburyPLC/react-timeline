import React from 'react'
import PropTypes from 'prop-types'

import { getDayMonth } from '../../../utils/formatDate'
import Marker from '.'

const PointerMarker = ({ time, date, visible, highlighted }) => (
  <Marker modifier="pointer" x={time.toX(date)} visible={visible} highlighted={highlighted}>
    <div>
      <div>
        <strong>{getDayMonth(date)}</strong>
      </div>
    </div>
  </Marker>
)

PointerMarker.propTypes = {
  time: PropTypes.shape({
    toX: PropTypes.func.isRequired,
  }).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool,
}

export default PointerMarker
