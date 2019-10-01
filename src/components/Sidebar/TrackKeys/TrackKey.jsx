import React from 'react'
import PropTypes from 'prop-types'

import TrackKeys from '.'

const TrackKey = ({ track, toggleOpen, clickTrackButton }) => {
  const { title, tracks, isOpen, hasButton, sideComponent } = track
  const isExpandable = isOpen !== undefined

  const buildSideComponent = () => {
    if (sideComponent) {
      return React.cloneElement(sideComponent)
    }
    if (hasButton && clickTrackButton) {
      const handleClick = () => clickTrackButton(track)
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      return <button className="rt-track-key__side-button" onClick={handleClick} type="button" />
    }

    return null
  }

  return (
    <li className="rt-track-key">
      <div className="rt-track-key__entry">
        {isExpandable && (
          <button
            title="Expand track"
            className={`rt-track-key__toggle ${isOpen ? 'rt-track-key__toggle--close' : 'rt-track-key__toggle--open'}`}
            onClick={() => toggleOpen(track)}
            type="button"
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        )}
        <span className="rt-track-key__title">{title}</span>
        {buildSideComponent()}
      </div>
      {isOpen && tracks && tracks.length > 0 && <TrackKeys tracks={tracks} toggleOpen={toggleOpen} />}
    </li>
  )
}

TrackKey.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.shape({})),
    isOpen: PropTypes.bool,
    hasButton: PropTypes.bool,
    sideComponent: PropTypes.element,
  }),
  toggleOpen: PropTypes.func,
  clickTrackButton: PropTypes.func,
}

TrackKey.defaultProps = {
  clickTrackButton: undefined,
}

export default TrackKey
