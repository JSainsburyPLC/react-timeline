import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import Grid from './Grid'

class Body extends PureComponent {
  render() {
    const { time, grid, tracks } = this.props
    return (
      <div className="rt-timeline__body">
        {grid && <Grid time={time} grid={grid} />}
        <Tracks time={time} tracks={tracks} />
      </div>
    )
  }
}

Body.propTypes = {
  time: PropTypes.shape({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.shape({})),
  tracks: PropTypes.arrayOf(PropTypes.shape({}))
}

export default Body
