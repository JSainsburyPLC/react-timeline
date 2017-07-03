import React from 'react'
import PropTypes from 'prop-types'

import Tracks from './'
import Element from './Element'

const Track = ({ time, elements, isOpen, tracks }) =>
  <div className="tr-track">
    <div className="rt-track__elements">
      { elements.filter(({ start, end }) => (end > start)).map(element =>
        <Element
          key={element.id}
          time={time}
          style={element.style}
          {...element}
        />)
      }
    </div>
    { isOpen && tracks && tracks.length > 0
      && <Tracks time={time} tracks={tracks} />
    }
  </div>

Track.propTypes = {
  time: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({}))
}

export default Track
