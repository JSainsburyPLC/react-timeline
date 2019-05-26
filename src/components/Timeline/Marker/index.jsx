import React from 'react'
import PropTypes from 'prop-types'

const Marker = ({ x, modifier, children, visible, highlighted }) => (
  <div
    className={`rt-marker rt-marker--${modifier} ${visible ? 'rt-is-visible' : ''} ${
      highlighted ? 'rt-is-highlighted' : ''
    }`}
    style={{ left: `${x}px` }}
  >
    <div className="rt-marker__label">
      <div className="rt-marker__content">{children}</div>
    </div>
  </div>
)

Marker.propTypes = {
  x: PropTypes.number.isRequired,
  modifier: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool,
  children: PropTypes.node,
}

export default Marker
