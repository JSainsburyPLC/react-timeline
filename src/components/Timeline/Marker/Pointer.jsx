import React, { PropTypes } from 'react'
import Marker from './'

const MouseMarker = ({ x, text, visible, highlighted }) =>
  <Marker modifier="pointer" x={x} visible={visible} highlighted={highlighted}>
    <div>
      <div><strong>{text}</strong></div>
    </div>
  </Marker>

MouseMarker.propTypes = {
  x: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool
}

export default MouseMarker
