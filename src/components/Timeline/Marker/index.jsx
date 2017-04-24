import React, { PropTypes } from 'react'

const Marker = ({ x, modifier, children, visible, highlighted }) =>
  <div
    className={`marker marker--${modifier} ${visible ? 'is-visible' : ''} ${highlighted ? 'is-highlighted' : ''}`}
    style={{ left: `${x}px` }}
  >
    <div className="marker__label">
      <div className="marker__content">
        {children}
      </div>
    </div>
  </div>

Marker.propTypes = {
  x: PropTypes.number.isRequired,
  modifier: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool,
  children: PropTypes.node
}

export default Marker
