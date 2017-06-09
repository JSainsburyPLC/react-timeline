import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import buildVerticalLines from '../../utils/buildVerticalLines'

class Body extends PureComponent {
  render() {
    const { time, timebar, tracks, clickElement } = this.props
    return (
      <div className="rt-timeline__body" style={buildVerticalLines(time, timebar[2])}>
        <Tracks time={time} tracks={tracks} clickElement={clickElement} />
      </div>
    )
  }
}

Body.propTypes = {
  time: PropTypes.shape({}).isRequired,
  timebar: PropTypes.arrayOf(PropTypes.shape({})),
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func
}

export default Body
