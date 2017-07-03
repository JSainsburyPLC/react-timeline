import React from 'react'
import PropTypes from 'prop-types'

import Track from './Track'

const Tracks = ({ time, tracks }) =>
  <div className="rt-tracks">
    {
      tracks.map(({ id, elements, isOpen, tracks: children }) =>
        <Track
          key={id}
          time={time}
          elements={elements}
          isOpen={isOpen}
          tracks={children}
        />
      )
    }
  </div>

Tracks.propTypes = {
  time: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({}))
}

export default Tracks
