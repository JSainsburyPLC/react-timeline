import React, { PropTypes } from 'react'

import Toggle from './Toggle'

const Controls = ({
  isOpen,
  toggleOpen,
  zoomIn,
  zoomOut,
  zoom,
  zoomMin,
  zoomMax
}) =>
  <div className="controls">
    <div className="controls__content">
      <Toggle isOpen={isOpen} toggleOpen={toggleOpen} />
      <button className="controls__button controls__button--zoom-in" disabled={zoomMax && zoom >= zoomMax} onClick={zoomIn}>Zoom in</button>
      <button className="controls__button controls__button--zoom-out" disabled={zoomMin && zoom <= zoomMin} onClick={zoomOut}>Zoom out</button>
    </div>
  </div>

Controls.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  zoomMin: PropTypes.number,
  zoomMax: PropTypes.number
}

export default Controls
