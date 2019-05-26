import React from 'react'
import PropTypes from 'prop-types'

import TrackKey from './TrackKey'

const TrackKeys = ({ tracks, toggleOpen, clickTrackButton }) => (
  <ul className="rt-track-keys">
    {tracks.map(track => (
      <TrackKey key={track.id} track={track} toggleOpen={toggleOpen} clickTrackButton={clickTrackButton} />
    ))}
  </ul>
)

TrackKeys.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  toggleOpen: PropTypes.func,
  clickTrackButton: PropTypes.func,
}

export default TrackKeys
