import React from 'react'
import PropTypes from 'prop-types'

const ZoomOut = ({ zoom, zoomMin, zoomOut }) => (
  <button
    className="rt-controls__button rt-controls__button--zoom-out"
    disabled={zoomMin && zoom <= zoomMin}
    onClick={zoomOut}
    type="button"
  >
    <span className="rt-visually-hidden">Zoom Out</span>
    <svg viewBox="1 1 59 59" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd">
        <path d="M12.5 22h24v6h-24z" />
        <path d="M25 48.5C12.02 48.5 1.5 37.98 1.5 25S12.02 1.5 25 1.5 48.5 12.02 48.5 25 37.98 48.5 25 48.5zm-.12-6.24c9.6 0 17.38-7.78 17.38-17.38 0-9.6-7.78-17.38-17.38-17.38-9.6 0-17.38 7.78-17.38 17.38 0 9.6 7.78 17.38 17.38 17.38z" />
        <rect width="24" height="8" rx="4" transform="rotate(45 -22.312 67.766)" />
      </g>
    </svg>
  </button>
)

ZoomOut.propTypes = {
  zoom: PropTypes.number.isRequired,
  zoomMin: PropTypes.number.isRequired,
  zoomOut: PropTypes.func.isRequired,
}

export default ZoomOut
